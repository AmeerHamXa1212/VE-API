import { Router } from "express";
import * as UserController from "../controllers/user";

const UserRouter = Router();

UserRouter.get("/health-check", UserController.healthcheck);
UserRouter.post("/login", UserController.login);
UserRouter.post("/generate-game-codes", UserController.generateGameCodes);

export default UserRouter;
