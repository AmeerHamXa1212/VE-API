import mongoose, { Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  gameCode: string;
  lastAttemptTime: Date;
  attemptedCounts: number;
}
const UserSchema = new Schema<IUser>({
  gameCode: {
    type: String,
    required: [true, "game code is required"],
    minlength: 8,
    maxlength: 8,
    unique: true,
  },
  attemptedCounts: {
    type: Number,
    default: 0,
  },
  lastAttemptTime: {
    type: Date,
    default: null,
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);
