import { getDashboardService } from "../services/dashboard.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const dashboard = await getDashboardService(userId);

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};