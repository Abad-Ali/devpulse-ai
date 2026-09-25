import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import { Strategy as GitHubStrategy } from "passport-github2";

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


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const githubId = profile.id;

        // GitHub may provide multiple emails
        const email = profile.emails?.find((item) => item.primary)?.value || profile.emails?.[0]?.value;

        const name = profile.displayName || profile.username || `github_${githubId}`;

        const avatar = profile.photos?.[0]?.value || "";

        if (!email) {
          return done(new Error("GitHub account email not available."));
        }

        // Find existing GitHub account
        let user = await User.findOne({
          authProviders: {
            $elemMatch: {
              provider: "github",
              providerId: githubId,
            },
          },
        });

        if (user) {
          return done(null, user);
        }

        //Check if this email already belongs to another account
        user = await User.findOne({email: email.toLowerCase(),});

        if (user) {
          return done(
            new Error(
              "An account with this email already exists. Please log in using your existing method."
            )
          );
        }

        //Generate username
        const usernameBase = (profile.username || email.split("@")[0]).toLowerCase().replace(/[^a-z0-9_]/g, "");

        let username = usernameBase || `github${githubId}`;

        //Make sure username is unique
        const usernameExists = await User.findOne({username});

        if (usernameExists) {username = `${username}${Date.now().toString().slice(-4)}`;}

        //Create new user
        user = await User.create({
          name,
          username,
          email: email.toLowerCase(),
          avatar,
          isEmailVerified: true,
          authProviders: [
            {
              provider: "github",
              providerId: githubId,
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

// GITHUB OAUTH - GITHUB INTEGRATION
passport.use(
  "github-integration",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_INTEGRATION_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const githubId = profile.id;

        const githubUsername =
          profile.username ||
          profile.displayName ||
          `github_${githubId}`;

        const githubAvatar =
          profile.photos?.[0]?.value || "";

        return done(null, {
          githubId,
          githubUsername,
          githubAvatar,
          accessToken,
          refreshToken,
        });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

export default passport;