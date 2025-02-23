import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = () => {
  return crypto.randomBytes(16).toString("base64url");
};

const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  return { accessToken, refreshToken };
};

export { generateAccessToken, generateRefreshToken, generateTokens };
