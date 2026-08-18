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
