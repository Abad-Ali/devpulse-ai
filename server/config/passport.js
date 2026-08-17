import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";


// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log(
//   "GOOGLE_CLIENT_SECRET exists:",
//   !!process.env.GOOGLE_CLIENT_SECRET
// );
// console.log("GOOGLE_CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const avatar = profile.photos?.[0]?.value || "";

        if (!email) {
          return done(new Error("Google account email not available."));
        }

        // Find existing Google account
        let user = await User.findOne({
          authProviders: {
            $elemMatch: {
              provider: "google",
              providerId: googleId,
            },
          },
        });

        if (user) {
          return done(null, user);
        }

        // Check whether email already belongs to an account
        user = await User.findOne({ email });

        if (user) {
          //Handleing account linking carefully later.
          return done(
            new Error("An account with this email already exists. Please log in using your existing method.")
          );
        }

        // Create new user
        const usernameBase = email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "");

        let username = usernameBase || `user${Date.now()}`;

        let usernameExists = await User.findOne({ username });

        if (usernameExists) {
          username = `${username}${Date.now().toString().slice(-4)}`;
        }

        user = await User.create({
          name: name || username,
          username,
          email: email.toLowerCase(),
          avatar,
          isEmailVerified: true,
          authProviders: [
            {
              provider: "google",
              providerId: googleId,
            },
          ],
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;