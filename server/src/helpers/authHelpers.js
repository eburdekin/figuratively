import crypto from "crypto";
import prisma from "../config/prisma.js";

const hashToken = (token) => {
  return crypto.createHash("sha512").update(token).digest("hex");
};

const addRefreshTokenToWhitelist = ({ refreshToken, userId }) => {
  return prisma.refreshToken.create({
    data: {
      hashedToken: hashToken(refreshToken),
      userId,
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    },
  });
};

// check if token sent in client request is in the db
const findRefreshToken = (token) => {
  return prisma.refreshToken.findUnique({
    where: {
      hashedToken: hashToken(token),
    },
  });
};

// soft delete tokens after usage
const deleteRefreshTokenById = (id) => {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

const revokeTokens = (userId) => {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};

export {
  addRefreshTokenToWhitelist,
  findRefreshToken,
  deleteRefreshTokenById,
  revokeTokens,
};
