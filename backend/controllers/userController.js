import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";
import Review from "../models/reviewModel.js";

const getMyBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ addedBy: req.user._id });
  res.status(200).json(books);
});

const getMyReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ userId: req.user._id }).populate(
    "bookId",
    "title author"
  );
  res.status(200).json(reviews);
});

export { getMyBooks, getMyReviews };
