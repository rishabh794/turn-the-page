import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";

const addBook = asyncHandler(async (req, res) => {
  const { title, author, description, genre, year } = req.body;

  if (!title || !author || !description || !genre || !year) {
    res.status(400);
    throw new Error("Please fill in all required fields.");
  }

  const book = await Book.create({
    title,
    author,
    description,
    genre,
    year,
    addedBy: req.user.id,
  });

  res.status(201).json(book);
});

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.status(200).json(books);
});

export { addBook, getAllBooks };
