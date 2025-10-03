import express from "express";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import { getMyBooks, getMyReviews } from "../controllers/userController.js";

const router = express.Router();

router.get("/my-books", authenticationMiddleware, getMyBooks);
router.get("/my-reviews", authenticationMiddleware, getMyReviews);

export default router;
