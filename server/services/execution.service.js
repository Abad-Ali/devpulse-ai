import mongoose from "mongoose";

import Execution from "../models/Execution.js";
import Program from "../models/Program.js";

export const createExecutionService = async ({userId, programId, status, stdout, stderr, executionTime, environment, exitCode}) => {
  if (!programId) {
    const error = new Error("Program ID is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(programId)) {
    const error = new Error("Invalid program ID.");
    error.statusCode = 400;
    throw error;
  }

  const allowedStatuses = Execution.schema.path("status").enumValues;
  if (!status) {
    const error = new Error("Execution status is required.");
    error.statusCode = 400;
    throw error;
  }
  if (!allowedStatuses.includes(status)) {
    const error = new Error("Invalid execution status.");
    error.statusCode = 400;
    throw error;
  }

  // Validate environment
  const allowedEnvironments = Execution.schema.path("environment").enumValues;
  if (!environment) {
    const error = new Error("Execution environment is required.");
    error.statusCode = 400;
    throw error;
  }
  if (!allowedEnvironments.includes(environment)) {
    const error = new Error("Invalid execution environment.");
    error.statusCode = 400;
    throw error;
  }

  // Validate execution time
  if (executionTime !== undefined) {
    if (typeof executionTime !== "number" || executionTime < 0) {
      const error = new Error("Execution time must be a non-negative number.");
      error.statusCode = 400;
      throw error;
    }
  }

  if (exitCode !== undefined && exitCode !== null) {
    if (!Number.isInteger(exitCode)) {
      const error = new Error("Exit code must be an integer.");
      error.statusCode = 400;
      throw error;
    }
  }

  // Validate program ownership
  const program = await Program.findOne({_id: programId, userId});
  if (!program) {
    const error = new Error("Program not found.");
    error.statusCode = 404;
    throw error;
  }

  const execution = await Execution.create({
    userId,
    programId,
    status,
    stdout: stdout ?? "",
    stderr: stderr ?? "",
    executionTime: executionTime ?? 0,
    environment,
    exitCode: exitCode ?? null,
  });

  return execution;
};

export const getMyExecutionsService = async (userId) => {
  if (!userId) {
    const error = new Error("User ID is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error("Invalid user ID.");
    error.statusCode = 400;
    throw error;
  }

  const executions = await Execution.find({ userId }).populate("programId", "title language").select("-userId -__v").sort({ createdAt: -1 }).lean();;

  return executions;
};

export const getMyExecutionService = async (userId, executionId) => {
  if (!executionId) {
    const error = new Error("Execution ID is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(executionId)) {
    const error = new Error("Invalid execution ID.");
    error.statusCode = 400;
    throw error;
  }

  const execution = await Execution.findOne({ _id: executionId, userId }).populate("programId", "title language").select("-userId -__v").lean();

  if (!execution) {
    const error = new Error("Execution not found.");
    error.statusCode = 404;
    throw error;
  }

  return execution;
};