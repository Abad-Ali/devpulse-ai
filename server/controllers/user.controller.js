import { getMyProgramService } from "../services/program.service.js";
import { deleteAccountService, getMyProfileService, getProfileService, setOrChangePasswordService, updateMyProfileService } from "../services/user.service.js";

// To get my Profile
export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await getMyProfileService(userId);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};


// UPDATE MY PROFILE
export const updateMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {name, username, bio, avatar} = req.body;

    const user = await updateMyProfileService(userId, {name, username, bio, avatar});

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
};


// Set ans Change Password
export const setOrChangePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {currentPassword, newPassword, confirmPassword} = req.body;

    const result = await setOrChangePasswordService(userId, { currentPassword, newPassword, confirmPassword });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
      result,
    });
  } catch (error) {
    next(error);
  }
};


// To delete account 
export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await deleteAccountService(userId);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

// GET MY PROGRAM
export const getMyProgram = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { programId } = req.params;

    const program = await getMyProgramService(userId, programId);

    return res.status(200).json({
      success: true,
      message: "Program retrieved successfully.",
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

// To get a user's profile
export const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await getProfileService(username);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};