import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel.js";
import Book from "../models/bookModel.js";

const addReview = asyncHandler(async (req, res) => {
  const { rating, reviewText } = req.body;
  const { bookId } = req.params;

  if (!rating || !reviewText) {
    res.status(400);
    throw new Error("Please provide a rating and review text.");
  }

  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404);
    throw new Error("Book not found.");
  }

  const review = await Review.create({
    rating,
    reviewText,
    bookId,
    userId: req.user.id,
  });

  const populatedReview = await Review.findById(review._id).populate(
    "userId",
    "name"
  );
  res.status(201).json(populatedReview);
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found.");
  }

  if (review.userId.toString() !== req.user.id && req.user.type !== "admin") {
    res.status(403);
    throw new Error("Forbidden: You are not authorized to delete this review.");
  }

  await review.deleteOne();

  res.status(200).json({ message: "Review deleted successfully." });
});

const getReviewsForBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const reviews = await Review.find({ bookId: bookId }).populate(
    "userId",
    "name"
  );

  res.status(200).json(reviews);
});

const updateReview = asyncHandler(async (req, res) => {
  const { rating, reviewText } = req.body;
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found.");
  }

  if (review.userId.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Forbidden: You can only edit your own reviews.");
  }

  review.rating = rating || review.rating;
  review.reviewText = reviewText || review.reviewText;

  await review.save();
  const updatedReview = await Review.findById(review._id).populate(
    "userId",
    "name"
  );
  res.status(200).json(updatedReview);
});

export { addReview, deleteReview, updateReview, getReviewsForBook };
