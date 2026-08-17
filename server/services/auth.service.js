import bcrypt from "bcryptjs";
import User from "../models/User.js";

// RegisterUser Service
export const registerUser = async ({name, username, email, password}) => {
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
  const existingEmail = await User.findOne({email: normalizedEmail});
  if (existingEmail) {
    const error = new Error("Email is already registered.");
    error.statusCode = 409;
    throw error;
  }

  // Check if username already exists
  const existingUsername = await User.findOne({username: normalizedUsername});
  if (existingUsername) {
    const error = new Error("Username is already taken.");
    error.statusCode = 409;
    throw error;
  }

  // Hashing password
  const passwordHash = await bcrypt.hash(password, 12);

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
  });

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

// LoginUser Service
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Find user and explicitly include passwordHash
  const user = await User.findOne({email: normalizedEmail}).select("+passwordHash");

  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  // Check whether account is active
  if (!user.isActive) {
    const error = new Error("Your account is inactive.");
    error.statusCode = 403;
    throw error;
  }

  // Account may exist through Google/GitHub without a password
  if (!user.passwordHash) {
    const error = new Error("This account does not have a password. Please use your connected login provider.");
    error.statusCode = 400;
    throw error;
  }

  // Compareing password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.passwordHash
  );

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