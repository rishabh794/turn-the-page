import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authenticationMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, please login.");
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(verified.id).select("-password");

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }
  req.user = user;
  next();
});

export default authenticationMiddleware;

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.type === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Forbidden: This action is reserved for admins only.");
  }
};
