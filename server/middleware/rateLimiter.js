import rateLimit from "express-rate-limit";

const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const DEFAULT_LIMIT = 10; // 10 requests

const rateLimiter = (options = {}) => {
  const {
    windowMs = DEFAULT_WINDOW_MS,
    limit = DEFAULT_LIMIT,
    message = "Too many requests. Please try again later.",
  } = options;

  return rateLimit({
    windowMs,
    limit,

    standardHeaders: "draft-7",
    legacyHeaders: false,

    message: {
      success: false,
      message,
    },
  });
};

export default rateLimiter;