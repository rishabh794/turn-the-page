import express from "express";
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import { addBook, getAllBooks } from "../controllers/bookController.js";

const router = express.Router();

router.post("/", authenticationMiddleware, addBook);
router.get("/", getAllBooks);

export default router;
