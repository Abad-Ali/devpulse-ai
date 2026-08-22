import { createExecutionService, getMyExecutionService, getMyExecutionsService } from "../services/execution.service.js";

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

export const getMyExecutions = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const executions = await getMyExecutionsService(userId);

    return res.status(200).json({
      success: true,
      message: "Executions retrieved successfully.",
      data: executions,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyExecution = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const executionId = req.params.executionId;

    const execution = await getMyExecutionService(userId, executionId);

    return res.status(200).json({
      success: true,
      message: "Execution retrieved successfully.",
      data: execution,
    });
  } catch (error) {
    next(error);
  }
};