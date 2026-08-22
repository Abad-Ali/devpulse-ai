import mongoose from "mongoose";

const executionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
      index: true,
    },

    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: [true, "Program ID is required."],
      index: true,
    },

    status: {
      type: String,
      required: [true, "Execution status is required."],
      enum: {
        values: ["pending", "running", "success", "error", "timeout"],
        message: "Execution status must be pending, running, success, error, or timeout.",
      },
    },

    stdout: {
      type: String,
      default: "",
    },

    stderr: {
      type: String,
      default: "",
    },

    executionTime: {
      type: Number,
      min: [0, "Execution time cannot be negative."],
      default: 0,
    },

    environment: {
      type: String,
      required: [true, "Execution environment is required."],
      enum: {
        values: ["browser", "wasm"],
        message: "Execution environment must be either browser or wasm.",
      },
      default: "browser",
    },

    exitCode: {
      type: Number,
      default: null,
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Execution = mongoose.model("Execution", executionSchema);

export default Execution;