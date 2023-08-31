import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { IUser, User } from "../models/user";
import Joi from "joi";

export function generateRandomCodes(
  Codecount: number
): Array<{ gameCode: string }> {
  const codes: Array<{ gameCode: string }> = [];
  const characters_Upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const characters_Lower = "abcdefghijklmnopqrstuvwxyz";

  const dictionary = characters_Lower + numbers + characters_Upper;

  for (let i = 0; i < Codecount; i++) {
    const codeLength = 8;
    let code = "";

    for (let j = 0; j < codeLength; j++) {
      const randomIndex = Math.floor(Math.random() * dictionary.length);
      code += dictionary.charAt(randomIndex);
    }

    //console.log(`Generated code ${i + 1}: ${code}`); // Print the generated code
    //codes.push(code);
    codes.push({ gameCode: code });
  }
  return codes;
}

function validateNoOfGameCodes(code: number) {
  const schema = Joi.object({
    noOfGameCodes: Joi.number().integer().min(1).max(100).required(),
  });

  return schema.validate(code);
}

function validateGameCode(gamecode: { GameCode: string }) {
  const schema = Joi.object({
    GameCode: Joi.string().min(8).max(8).required(),
  });

  return schema.validate(gamecode);
}

export const healthcheck = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is up and running" });
};
export const generateGameCodes = async (req: Request, res: Response) => {
  //it shall recive no of game codes to be generated from request
  const { error, value } = validateNoOfGameCodes(req.body);
  if (error) {
    console.log(`Error is : ${error}`);
    return res.status(400).json({ message: error.details[0].message });
  }

  const numberOfGameCode: number = value.noOfGameCodes;
  const randomGameCodes = generateRandomCodes(numberOfGameCode);
  try {
    const savedCodes = await User.insertMany(randomGameCodes);

    // console.log(`numberOfGameCode == ${numberOfGameCode}`);
    // console.log("Body contents are : ", req.body.noOfGameCodes);
    // console.log("Value from validateNoOfGameCodes:", value);
    //console.log("Random game codes:", randomGameCodes);

    console.log(`Following are the generated codes : 
    ${savedCodes}`);
    res.status(200).json(savedCodes);
  } catch (error) {
    console.log(`Error is : ${error}`);
    res.status(500).json({ message: "Failed to generate game codes" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { error } = validateGameCode({ GameCode: req.body.gameCode }); // Validate the field "GameCode"
  if (error) {
    console.log(`Error is : ${error}`);
    return res.status(400).json({ message: error.details[0].message });
  }
  const GameCode = req.body.gameCode; // Access the gameCode directly from req.body

  try {
    const user = await User.findOne({ gameCode: GameCode });

    if (!user) {
      return res.status(401).json({ message: "Invalid game code" });
    }

    if (user.attemptedCounts >= 5 && user.lastAttemptTime) {
      const currentTime = new Date();
      const timeSinceLastAttempt =
        currentTime.getTime() - user.lastAttemptTime.getTime();
      const retryTime = 5 * 60 * 1000;

      if (timeSinceLastAttempt < retryTime) {
        return res.status(429).json({ message: "Try after some time" });
      }
    }

    // Update the attempted count here
    user.attemptedCounts += 1;
    user.lastAttemptTime = new Date();
    await user.save(); // Save the updated user object

    console.log(`Logged in as : ${user}`);
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.log(`Error is : ${error}`);
    res.status(500).json({ message: "Login failed" });
  }
};
