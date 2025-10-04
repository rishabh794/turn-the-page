// --- Modern ES Module Imports ---
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log("DB CONNECTION ERROR", err));

// --- Core Middleware ---
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Turn The Page API!",
    status: "OK",
    documentation:
      "https://github.com/YourUsername/turn-the-page#api-endpoints", // Optional: Link to your README
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

// --- Server Startup ---
const port = process.env.PORT || 8008;
app.listen(port, () => console.log(`Server is running on port ${port}`));
