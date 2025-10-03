import express from "express";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import { deleteReview, updateReview } from "../controllers/reviewController.js";

const router = express.Router();

router.put("/:id", authenticationMiddleware, updateReview);
router.delete("/:id", authenticationMiddleware, deleteReview);

export default router;
