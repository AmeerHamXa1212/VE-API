import RateLimit from "express-rate-limit";

export const limiter = RateLimit({
  windowMs: 5 * 60 * 1000, //5min,
  max: 5,
  message: `To many attempts, try after 5 minutes`,
});
