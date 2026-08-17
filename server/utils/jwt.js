import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
      accountType: user.accountType,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};