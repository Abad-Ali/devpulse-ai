import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Program title is required."],
      trim: true,
      minlength: [1, "Program title cannot be empty."],
      maxlength: [100, "Program title cannot exceed 100 characters."],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Program description cannot exceed 500 characters."],
      default: "",
    },

    language: {
      type: String,
      required: [true, "Programming language is required."],
      enum: {
        values: ["javascript", "python", "c", "cpp"],
        message: "Unsupported programming language.",
      },
      lowercase: true,
      trim: true,
    },

    code: {
      type: String,
      default: "",
      maxlength: [100000, "Program code cannot exceed 100,000 characters."],
    },

    visibility: {
      type: String,
      enum: {
        values: ["public", "private"],
        message: "Visibility must be either public or private.",
      },
      default: "private",
    },

    lastRunAt: {type: Date, default: null},
  },
  {timestamps: true}
);

const Program = mongoose.model("Program", programSchema);

export default Program;