import express from "express";
import {
  register,
  login,
  refreshToken,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refreshToken", refreshToken);

export default router;
