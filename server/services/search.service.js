import Program from "../models/Program.js";
import User from "../models/User.js";

export const searchUsersService = async (query) => {
  if (!query || typeof query !== "string") {
    const error = new Error("Search query is required.");
    error.statusCode = 400;
    throw error;
  }

  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    const error = new Error("Search query cannot be empty.");
    error.statusCode = 400;
    throw error;
  }

  if (trimmedQuery.length < 2) {
    const error = new Error("Search query must be at least 2 characters long.");
    error.statusCode = 400;
    throw error;
  }

  if (trimmedQuery.length > 50) {
    const error = new Error("Search query cannot exceed 50 characters.");
    error.statusCode = 400;
    throw error;
  }

  const users = await User.find({
    $or: [
      {
        username: {
          $regex: trimmedQuery,
          $options: "i",
        },
      },
      {
        name: {
          $regex: trimmedQuery,
          $options: "i",
        },
      },
    ]
  }) .select("username name bio avatar createdAt").limit(20);

  return users;
};

export const searchProgramsService = async (query) => {
  if (!query || typeof query !== "string") {
    const error = new Error("Search query is required.");
    error.statusCode = 400;
    throw error;
  }

  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    const error = new Error("Search query cannot be empty.");
    error.statusCode = 400;
    throw error;
  }

  if (trimmedQuery.length < 2) {
    const error = new Error("Search query must be at least 2 characters long.");
    error.statusCode = 400;
    throw error;
  }

  if (trimmedQuery.length > 50) {
    const error = new Error("Search query cannot exceed 50 characters.");
    error.statusCode = 400;
    throw error;
  }

  const matchingUsers = await User.find({
    username: {
      $regex: trimmedQuery,
      $options: "i",
    },
  }).select("_id");

  const userIds = matchingUsers.map((user) => user._id);

  const programs = await Program.find({
    visibility: "public",
    $or: [
      {
        title: {
          $regex: trimmedQuery,
          $options: "i",
        },
      },
      {
        description: {
          $regex: trimmedQuery,
          $options: "i",
        },
      },
      {
        language: {
          $regex: trimmedQuery,
          $options: "i",
        },
      },
      {
        code: {
          $regex: trimmedQuery,
          $options: "i",
        },
      },
      {
        userId: {
          $in: userIds,
        },
      }
    ]
  }).populate({path: "userId", select: "name username avatar"}).select("title description language visibility createdAt updatedAt userId").sort({ createdAt: -1 }).limit(20);

  return programs;
};