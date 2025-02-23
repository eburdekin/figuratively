import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const createUserByEmailAndPassword = (user) => {
  user.password = bcrypt.hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
};

const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export { findUserByEmail, createUserByEmailAndPassword, findUserById };
