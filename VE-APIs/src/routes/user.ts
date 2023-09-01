import { Router } from "express";
import * as UserController from "../controllers/user";
import { limiter } from "../helpers/RateLimiter";

const UserRouter = Router();

UserRouter.get("/health-check", UserController.healthcheck);
UserRouter.post("/login", limiter, UserController.login);
UserRouter.post("/generate-game-codes", UserController.generateGameCodes);

export default UserRouter;
