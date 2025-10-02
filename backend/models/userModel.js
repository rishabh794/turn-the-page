import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add an email!"],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email!",
      ], // Basic email format validation
    },
    type: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minLength: [8, "Password must be at least 8 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt Password before saving (This part is perfect, no changes needed)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
