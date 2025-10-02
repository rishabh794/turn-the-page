import express from "express";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import { deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

router.delete("/:id", authenticationMiddleware, deleteReview);

export default router;
