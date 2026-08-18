import { loginUser, registerUser, requestPasswordReset, resendVerificationEmail, resetPasswordService, verifyEmailToken } from "../services/auth.service.js";
import { generateAccessToken } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    //Calling the auth.service.js
    const user = await registerUser({name, username, email, password});

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please check your email to verify your account.",
      user,
    });
  } catch (error) {
    next(error);
  }
};


export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    const user = await verifyEmailToken(token);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user,
    });
  } catch (error) {
    next(error);
  }
};


export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    await resendVerificationEmail(email);

    return res.status(200).json({
      success: true,
      message: "If an account exists with this email, a verification email has been sent.",
    });
  } catch (error) {
    next(error);
  }
};


export const sendResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    await requestPasswordReset(email);

    return res.status(200).json({
      success: true,
      message: "Password reset email has been sent.",
    });
  } catch (error) {
    next(error);
  }
}


export const resetPassword = async (req, res, next) => {
  try {
    const {token, password} = req.body;

    const user = await resetPasswordService(token, password);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
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


export const getMe = async (req, res, next) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        role: user.role,
        accountType: user.accountType,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    next(error);
  }
};


export const oauthCallback = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "OAuth authentication failed",
      });
    }

    const accessToken = generateAccessToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return res.redirect(`${process.env.CLIENT_URL}/`);

    return res.status(200).json({
      success: true,
      message: "OAuth authentication successful",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};