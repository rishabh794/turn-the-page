import express from "express";
import {
  registerUser,
  login,
  logOut,
  getUserDetails,
} from "../controllers/authController.js";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logOut);
router.get("/user-details", authenticationMiddleware, getUserDetails);

export default router;
