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