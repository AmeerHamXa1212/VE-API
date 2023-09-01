import Joi from "joi";

export function validateNoOfGameCodes(code: number) {
  const schema = Joi.object({
    noOfGameCodes: Joi.number().integer().min(1).max(100).required(),
  });

  return schema.validate(code);
}

export function validateGameCode(gamecode: { GameCode: string }) {
  const schema = Joi.object({
    GameCode: Joi.string().min(8).max(8).required(),
  });

  return schema.validate(gamecode);
}
