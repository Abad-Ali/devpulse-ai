import { loginUser, registerUser } from "../services/auth.service.js";
import { generateAccessToken } from "../utils/jwt.js";

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


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Calling the auth.service.js
    const user = await loginUser({email, password});

    const token = generateAccessToken(user);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user,
    });
  } catch (error) {
    next(error);
  }
};