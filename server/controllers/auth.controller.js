import { registerUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    //Calling the auth.service.js
    const user = await registerUser({name, username, email, password});

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
};