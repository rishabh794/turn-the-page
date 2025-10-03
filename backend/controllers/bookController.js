import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";
import Review from "../models/reviewModel.js";

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
  const { search, genre, sort } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const matchStage = {};
  if (search) {
    matchStage.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
    ];
  }
  if (genre) {
    matchStage.genre = genre;
  }

  let pipeline = [
    { $match: matchStage },

    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "bookId",
        as: "reviews",
      },
    },
    {
      $addFields: {
        reviewCount: { $size: "$reviews" },
        averageRating: { $avg: "$reviews.rating" },
      },
    },
  ];

  const sortStage = {};
  if (sort) {
    const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith("-") ? -1 : 1;
    sortStage[sortField] = sortOrder;
  } else {
    sortStage.createdAt = -1;
  }
  pipeline.push({ $sort: sortStage });

  const paginatedPipeline = [...pipeline, { $skip: skip }, { $limit: limit }];

  const books = await Book.aggregate(paginatedPipeline);

  const totalBooksPipeline = [...pipeline, { $count: "total" }];
  const totalBooksResult = await Book.aggregate(totalBooksPipeline);
  const totalBooks =
    totalBooksResult.length > 0 ? totalBooksResult[0].total : 0;
  const totalPages = Math.ceil(totalBooks / limit);

  res.status(200).json({
    totalBooks,
    totalPages,
    currentPage: page,
    books,
  });
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  const reviews = await Review.find({ bookId: req.params.id });

  let averageRating = 0;
  if (reviews.length > 0) {
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    averageRating = (sum / reviews.length).toFixed(1);
  }

  const bookObject = book.toObject();
  bookObject.averageRating = Number(averageRating);
  bookObject.reviewCount = reviews.length;

  res.status(200).json(bookObject);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  if (book.addedBy.toString() !== req.user.id && req.user.type !== "admin") {
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

  if (book.addedBy.toString() !== req.user.id && req.user.type !== "admin") {
    res.status(403);
    throw new Error("Forbidden: You are not authorized to delete this book.");
  }

  await book.deleteOne();

  res.status(200).json({ message: "Book deleted successfully." });
});

export { addBook, getAllBooks, getBookById, updateBook, deleteBook };
