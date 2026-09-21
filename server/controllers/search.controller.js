import { searchProgramsService, searchUsersService } from "../services/search.service.js";

export const searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;

    const users = await searchUsersService(q);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const searchPrograms = async (req, res, next) => {
  try {
    const { q } = req.query;

    const programs = await searchProgramsService(q);

    return res.status(200).json({
      success: true,
      message: "Programs fetched successfully.",
      data: programs,
    });
  } catch (error) {
    next(error);
  }
};