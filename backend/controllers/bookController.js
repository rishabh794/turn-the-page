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

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  res.status(200).json(book);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  if (book.addedBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Forbidden: You are not authorized to update this book.");
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBook);
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  if (book.addedBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Forbidden: You are not authorized to delete this book.");
  }

  await book.deleteOne();

  res.status(200).json({ message: "Book deleted successfully." });
});

export { addBook, getAllBooks, getBookById, updateBook, deleteBook };
