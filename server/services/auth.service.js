import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateSecureToken, hashToken } from "../utils/verificationToken.js";
import { sendPasswordResetEmail, sendVerificationEmail } from "./email.service.js";

// RegisterUser Service
export const registerUser = async ({ name, username, email, password }) => {
  if (!name || !username || !email || !password) {
    const error = new Error("Name, username, email and password are required.");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error("Password must be at least 8 characters long.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedName = name.trim();

  // Check if email already exists
  const existingEmail = await User.findOne({ email: normalizedEmail });
  if (existingEmail) {
    const error = new Error("Email is already registered.");
    error.statusCode = 409;
    throw error;
  }

  // Check if username already exists
  const existingUsername = await User.findOne({ username: normalizedUsername });
  if (existingUsername) {
    const error = new Error("Username is already taken.");
    error.statusCode = 409;
    throw error;
  }

  // Hashing password
  const passwordHash = await bcrypt.hash(password, 12);

  // Generate email verification token
  const { rawToken, hashedToken } = generateSecureToken();

  // Token expires in 5 minutes
  const verificationExpires = new Date(Date.now() + 5 * 60 * 1000);

  // Creating new user
  const user = await User.create({
    name: normalizedName,
    username: normalizedUsername,
    email: normalizedEmail,
    passwordHash,
    authProviders: [
      {
        provider: "email",
      },
    ],
    isEmailVerified: false,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: verificationExpires,
  });

   // Create verification URL
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${encodeURIComponent(rawToken)}`;

  // Send email
  await sendVerificationEmail({email: user.email, name: user.name, verificationUrl});

  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    avatar: user.avatar,
    role: user.role,
    accountType: user.accountType,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
};


// VerifyEmailToken
export const verifyEmailToken = async (token) => {
  if (!token) {
    const error = new Error("Verification token is required.");
    error.statusCode = 400;
    throw error;
  }

  const hashedToken = hashToken(token);

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: {
      $gt: new Date(),
    },
  });

  if (!user) {
    const error = new Error("Invalid or expired verification link.");

    error.statusCode = 400;
    throw error;
  }

  user.isEmailVerified = true;

  // Invalidate the token after successful verification
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;

  await user.save();

  return {
    id: user._id,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
  };
};


// ResendVerificationEmail
export const resendVerificationEmail = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({email: normalizedEmail});

  // Not reveling is email exist
  if (!user) {
    return;
  }

  if (user.isEmailVerified) {
    const error = new Error("Email is already verified.");
    error.statusCode = 400;
    throw error;
  }

  // Generate a NEW token every time
  const {rawToken, hashedToken} = generateSecureToken();

  // Replace the old token
  user.emailVerificationToken = hashedToken;

  // New token expires in 5 minutes
  user.emailVerificationExpires = new Date(Date.now() + 5 * 60 * 1000);

  await user.save();

  // Create verification URL
  const verificationUrl =`${process.env.CLIENT_URL}/verify-email?token=${encodeURIComponent(rawToken)}`;

  await sendVerificationEmail({email: user.email, name: user.name, verificationUrl});
};


//RequestPasswordReset
export const requestPasswordReset = async (email) =>{
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({email: normalizedEmail});

  // Not reveling is email exist
  if (!user) {
    return;
  }

  if (!user.isActive || user.deletedAt) {
    const error = new Error("This account is inactive or deleted.");
    error.statusCode = 403;
    throw error;
  }

  // Generate a NEW token every time
  const {rawToken, hashedToken} = generateSecureToken();

  //Adding passwordResetToken
  user.passwordResetToken = hashedToken;

  // New token expires in 5 minutes
  user.passwordResetExpires = new Date(Date.now() + 5 * 60 * 1000);

  await user.save();

  // Create verification URL
  const resetUrl =`${process.env.CLIENT_URL}/reset-password?token=${encodeURIComponent(rawToken)}`;

  await sendPasswordResetEmail({email: user.email, name: user.name, resetUrl})
}


// ResetPassword
export const resetPasswordService = async (token, newPassword) => {
  if (!token || !newPassword) {
    const error = new Error("Token and new password are required.");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 8) {
    const error = new Error("Password must be at least 8 characters long.");
    error.statusCode = 400;
    throw error;
  }

  // Hash the token received from the frontend
  const hashedToken = hashToken(token);

  // Find user with matching token that has not expired
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {$gt: new Date(),},
  });

  if (!user) {
    const error = new Error("Invalid or expired password reset link.");
    error.statusCode = 400;
    throw error;
  }

  if (!user.isActive || user.deletedAt) {
    const error = new Error("This account is inactive or deleted.");
    error.statusCode = 403;
    throw error;
  }

  // Hash the new password
  const passwordHash = await bcrypt.hash(newPassword, 12);

  // Update password
  user.passwordHash = passwordHash;

  // Invalidate reset token
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  await user.save();

  return {
    id: user._id,
    email: user.email,
  };
};


// LoginUser Service
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Find user and explicitly include passwordHash
  const user = await User.findOne({ email: normalizedEmail }).select(
    "+passwordHash",
  );

  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  // Check whether account is active or not deleted account
  if (!user.isActive || user.deletedAt) {
    const error = new Error("This account is inactive or deleted.");
    error.statusCode = 403;
    throw error;
  }

  // Account may exist through Google/GitHub without a password
  if (!user.passwordHash) {
    const error = new Error(
      "This account does not have a password. Please use your connected login provider.",
    );
    error.statusCode = 400;
    throw error;
  }

  // Compareing password
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    avatar: user.avatar,
    role: user.role,
    accountType: user.accountType,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
};
