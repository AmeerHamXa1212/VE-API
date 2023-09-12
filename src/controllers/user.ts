import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { limiter } from "../helpers/RateLimiter";
import { MemoryStore } from "express-rate-limit";
import mongoose from "mongoose";
import { IUser, User } from "../models/user";
import Joi from "joi";
import {
  validateNoOfGameCodes,
  validateGameCode,
} from "../validation/validation";
import { generateRandomCodes } from "../helpers/RandomCode";

export const healthcheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: "Server is up and running" });
};

export const generateGameCodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = validateNoOfGameCodes(req.body);
  if (error) {
    console.log(`Error is : ${error}`);
    return res.status(400).json({ message: error.details[0].message });
  }
  const numberOfGameCode: number = value.noOfGameCodes;
  const randomGameCodes = generateRandomCodes(numberOfGameCode);
  const savedCodes = await User.insertMany(randomGameCodes);
  console.log(`Following are the generated codes: ${savedCodes}`);
  res.status(200).json(savedCodes);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateGameCode({ GameCode: req.body.gameCode });
  if (error) {
    console.log(`Error is : ${error}`);
    return res.status(400).json({ message: error.details[0].message });
  }
  const GameCode = req.body.gameCode;
  const user = await User.findOne({ gameCode: GameCode });
  if (!user) {
    return limiter(req, res, () => {
      res.status(401).json({ message: "Invalid game code" });
    });
  }
  console.log(`Logged in as: ${user}`);
  user.attemptedCounts += 1;
  await user.save();
  res.status(200).json({ message: "Logged in successfully" });
};
