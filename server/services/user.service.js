import bcrypt from "bcryptjs";
import User from "../models/User.js";

// GET MY PROFILE
export const getMyProfileService = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash " + "-emailVerificationToken " + "-emailVerificationExpires " + "-passwordResetToken " + "-passwordResetExpires" + "-authProviders");

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    avatar: user.avatar,

    authProviders: (user.authProviders || []).map(
      (authProvider) => authProvider.provider,
    ),

    role: user.role,
    accountType: user.accountType,

    preferences: user.preferences,
    stats: user.stats,

    isEmailVerified: user.isEmailVerified,
    isActive: user.isActive,

    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

// UPDATE MY PROFILE
export const updateMyProfileService = async (userId, { name, username, bio, avatar }) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  if (name !== undefined) {
    const normalizedName = name.trim();
    if (!normalizedName) {
      const error = new Error("Name cannot be empty.");
      error.statusCode = 400;
      throw error;
    }

    user.name = normalizedName;
  }

  if (username !== undefined) {
    const normalizedUsername = username.trim().toLowerCase();
    if (!normalizedUsername) {
      const error = new Error("Username cannot be empty.");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({username: normalizedUsername, _id: { $ne: userId }});
    if (existingUser) {
      const error = new Error(`Username ${normalizedUsername} is already taken.`);
      error.statusCode = 409;
      throw error;
    }

    user.username = normalizedUsername;
  }

  if (bio !== undefined) {
    user.bio = bio.trim();
  }

  if (avatar !== undefined) {
    user.avatar = avatar;
  }

  await user.save();

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
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

// Set Or ChangePassword
export const setOrChangePasswordService = async (userId, {currentPassword, newPassword, confirmPassword }) => {
  if (!newPassword || !confirmPassword) {
    const error = new Error("New password and confirm password are required.");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword !== confirmPassword) {
    const error = new Error("New passwords do not match.");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 8) {
    const error = new Error("Password must be at least 8 characters long.");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId).select("+passwordHash");

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error("Your account is inactive.");
    error.statusCode = 403;
    throw error;
  }

  const hasPassword = Boolean(user.passwordHash);
  const hasEmailProvider = user.authProviders.some(
    (provider) => provider.provider === "email",
  );

  // Existing password -> require current password
  if (hasPassword) {
    if (!currentPassword) {
      const error = new Error("Current password is required.");
      error.statusCode = 400;
      throw error;
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isValid) {
      const error = new Error("Current password is incorrect.");
      error.statusCode = 401;
      throw error;
    }

    if (currentPassword === newPassword) {
      const error = new Error("New password must be different from your current password.");
      error.statusCode = 400;
      throw error;
    }
  }

  user.passwordHash = await bcrypt.hash(newPassword, 12);

  // OAuth user setting password for the first time
  if (!hasEmailProvider) {
    user.authProviders.push({ provider: "email" });
  }

  await user.save();

  return {
    message: hasPassword ? "Password changed successfully." : "Password set successfully.",
  };
};  


// Delete Account
export const deleteAccountService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  if (user.deletedAt) {
    const error = new Error("Account is already deleted.");
    error.statusCode = 400;
    throw error;
  }

  user.isActive = false;
  user.deletedAt = new Date();

  await user.save();

  return {
    message: "Account deleted successfully.",
  };
};