import express from "express";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import {
  addReview,
  getReviewsForBook,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);

router.post("/", authenticationMiddleware, addBook);
router.put("/:id", authenticationMiddleware, updateBook);
router.delete("/:id", authenticationMiddleware, deleteBook);

router.post("/:bookId/reviews", authenticationMiddleware, addReview);
router.get("/:bookId/reviews", getReviewsForBook);

export default router;
