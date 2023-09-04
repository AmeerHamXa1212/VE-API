import RateLimit, { MemoryStore } from "express-rate-limit";

export const limiter = RateLimit({
  store: new MemoryStore(),
  windowMs: 2 * 60 * 1000, //5min,
  max: 5,
  message: `To many attempts, try after 2 minutes`,
});
