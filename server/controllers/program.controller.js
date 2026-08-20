import { createProgramService, getMyProgramsService } from "../services/program.service.js";

// CREATE PROGRAM
export const createProgram = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { title, description, language, visibility } = req.body;

    const program = await createProgramService(userId, {title, description, language, visibility});

    return res.status(201).json({
      success: true,
      message: "Program created successfully.",
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

// GET MY PROGRAMS
export const getMyPrograms = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await getMyProgramsService(userId);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.programs,
    });
  } catch (error) {
    next(error);
  }
};