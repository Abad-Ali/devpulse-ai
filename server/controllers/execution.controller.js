import { createExecutionService } from "../services/execution.service.js";

export const createExecution = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { programId, status, stdout, stderr, executionTime, environment, exitCode } = req.body;

    const execution = await createExecutionService({ userId, programId, status, stdout, stderr, executionTime, environment, exitCode });

    return res.status(201).json({
      success: true,
      message: "Execution recorded successfully.",
      data: execution,
    });
  } catch (error) {
    next(error);
  }
};