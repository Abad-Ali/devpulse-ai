import { getMyProfileService, updateMyProfileService } from "../services/user.service.js";


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