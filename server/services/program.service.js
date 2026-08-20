import mongoose from "mongoose";
import Program from "../models/Program.js";


// CREATE PROGRAM
export const createProgramService = async (userId, {title, description, language, visibility}) => {
  if (!title) {
    const error = new Error("Program title is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!language) {
    const error = new Error("Programming language is required.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    const error = new Error("Program title cannot be empty.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedLanguage = language.trim().toLowerCase();
  const allowedLanguages = Program.schema.path("language").enumValues;
  if (!allowedLanguages.includes(normalizedLanguage)) {
    const error = new Error("Unsupported programming language.");
    error.statusCode = 400;
    throw error;
  }

  const allowedVisibility = Program.schema.path("visibility").enumValues;
  if (visibility !== undefined && !allowedVisibility.includes(visibility)) {
    const error = new Error("Invalid program visibility.");
    error.statusCode = 400;
    throw error;
  }

  const program = await Program.create({
    userId,
    title: normalizedTitle,
    description: description ? description.trim() : "",
    language: normalizedLanguage,
    visibility: visibility ?? "private",
  });

  return {
    id: program._id,
    userId: program.userId,
    title: program.title,
    description: program.description,
    language: program.language,
    code: program.code,
    visibility: program.visibility,
    lastRunAt: program.lastRunAt,
    createdAt: program.createdAt,
    updatedAt: program.updatedAt,
  };
};


// GET MY PROGRAMS
export const getMyProgramsService = async (userId) => {
  if (!userId) {
    const error = new Error("User ID is required.");
    error.statusCode = 400;
    throw error;
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID.");
    error.statusCode = 400;
    throw error;
  }

  const programs = await Program.find({ userId }).sort({ updatedAt: -1 });

  if (programs.length === 0) {
    return {
      programs: [],
      message: "No programs found.",
    };
  }

  return {
    programs: programs.map((program) => ({
      id: program._id,
      userId: program.userId,
      title: program.title,
      description: program.description,
      language: program.language,
      code: program.code,
      visibility: program.visibility,
      lastRunAt: program.lastRunAt,
      createdAt: program.createdAt,
      updatedAt: program.updatedAt,
    })),
    message: "Programs retrieved successfully.",
  };
};


// GET MY PROGRAM
export const getMyProgramService = async (userId, programId) => {
  if (!userId) {
    const error = new Error("User ID is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!programId) {
    const error = new Error("Program ID is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID.");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(programId)) {
    const error = new Error("Invalid program ID.");
    error.statusCode = 400;
    throw error;
  }

  const program = await Program.findOne({_id: programId, userId});

  if (!program) {
    const error = new Error("Program not found.");
    error.statusCode = 404;
    throw error;
  }

  return program.toObject();
};

// UPDATE PROGRAM
export const updateProgramService = async ( userId, programId, { title, description, language, visibility }) => {
  if (!userId) {
    const error = new Error("User ID is required.");
    error.statusCode = 400;
    throw error;
  }
  if (!programId) {
    const error = new Error("Program ID is required.");
    error.statusCode = 400;
    throw error;
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID.");
    error.statusCode = 400;
    throw error;
  }
  if (!mongoose.Types.ObjectId.isValid(programId)) {
    const error = new Error("Invalid program ID.");
    error.statusCode = 400;
    throw error;
  }

  const program = await Program.findOne({_id: programId, userId});
  if (!program) {
    const error = new Error("Program not found.");
    error.statusCode = 404;
    throw error;
  }

  if (title === undefined && description === undefined && language === undefined && visibility === undefined) {
    const error = new Error("At least one program field is required to update.");
    error.statusCode = 400;
    throw error;
  }

  if (title !== undefined) {
    if (typeof title !== "string") {
      const error = new Error("Program title must be a string.");
      error.statusCode = 400;
      throw error;
    }

    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      const error = new Error("Program title cannot be empty.");
      error.statusCode = 400;
      throw error;
    }

    program.title = normalizedTitle;
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      const error = new Error("Program description must be a string.");
      error.statusCode = 400;
      throw error;
    }

    program.description = description.trim();
  }

  if (language !== undefined) {
    if (typeof language !== "string") {
      const error = new Error("Programming language must be a string.");
      error.statusCode = 400;
      throw error;
    }

    const normalizedLanguage = language.trim().toLowerCase();
    const allowedLanguages = Program.schema.path("language").enumValues;

    if (!allowedLanguages.includes(normalizedLanguage)) {
      const error = new Error("Unsupported programming language.");
      error.statusCode = 400;
      throw error;
    }

    program.language = normalizedLanguage;
  }

  if (visibility !== undefined) {
    if (typeof visibility !== "string") {
      const error = new Error("Program visibility must be a string.");
      error.statusCode = 400;
      throw error;
    }

    const normalizedVisibility = visibility.trim().toLowerCase();
    const allowedVisibility = Program.schema.path("visibility").enumValues;

    if (!allowedVisibility.includes(normalizedVisibility)) {
      const error = new Error("Invalid program visibility.");
      error.statusCode = 400;
      throw error;
    }

    program.visibility = normalizedVisibility;
  }

  if (!program.isModified()) {
    const error = new Error("No changes were made to the program.");
    error.statusCode = 400;
    throw error;
  }

  await program.save();

  return program.toObject();
};