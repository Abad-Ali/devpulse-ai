import mongoose from "mongoose";
import Program from "../models/Program.js";
import Execution from "../models/Execution.js";

export const getDashboardService = async (userId) => {
  // VALIDATE USER ID
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

  // BASIC STATS
  const [totalPrograms, totalExecutions, successfulExecutions] = await Promise.all([
    Program.countDocuments({ userId }),
    Execution.countDocuments({ userId }),
    Execution.countDocuments({ userId, status: "success" }),
  ]);

  const successRate = totalExecutions > 0 ? Math.round( (successfulExecutions / totalExecutions) * 100 ) : 0;

  // RECENT PROGRAMS
  const recentPrograms = await Program.find({ userId }).select("title language visibility updatedAt").sort({ updatedAt: -1 }).limit(6).lean();
  const formattedRecentPrograms = recentPrograms.map(
    (program) => ({
      id: program._id,
      title: program.title,
      language: program.language,
      visibility: program.visibility,
      updatedAt: program.updatedAt,
    })
  );

  // RECENT EXECUTIONS
  const recentExecutions = await Execution.find({ userId }).populate("programId", "title language").select("programId status executionTime createdAt").sort({ createdAt: -1 }).limit(7).lean();
  const recentActivity = recentExecutions.map(
    (execution) => ({
      id: execution._id,
      type: "execution",
      title: execution.programId?.title || "Program",
      language: execution.programId?.language || null,
      status: execution.status,
      executionTime: execution.executionTime,
      createdAt: execution.createdAt,
    })
  );

  // ACTIVITY - LAST 7 DAYS
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate( today.getDate() - 6 );
  sevenDaysAgo.setHours( 0, 0, 0, 0 );

  const executions = await Execution.find({ userId, createdAt: { $gte: sevenDaysAgo } }).select("status createdAt").sort({ createdAt: 1 }).lean();

  // GROUP EXECUTIONS BY DAY
  const activity = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(sevenDaysAgo.getDate() + i);

    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const dayExecutions = executions.filter(
      (execution) => {
        const executionDate = new Date(
          execution.createdAt
        );

        return (
          executionDate >= date &&
          executionDate < nextDate
        );
      }
    );

    const successful = dayExecutions.filter((execution) => execution.status === "success").length;

    activity.push({
      date: date.toISOString().split("T")[0],
      executions: dayExecutions.length,
      successful,

      // These will be connected
      // when those features exist.
      ai: 0,
      github: 0,
    });
  }

  // DASHBOARD RESPONSE
  return {
    stats: {
      programs: totalPrograms,
      executions: totalExecutions,
      successfulExecutions,
      successRate,

      // AI feature not connected yet.
      aiRequests: 0,
    },

    activity,
    recentPrograms: formattedRecentPrograms,
    recentActivity,
  };
};