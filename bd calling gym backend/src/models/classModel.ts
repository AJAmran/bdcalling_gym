import { model, Schema, Types } from "mongoose";

type ClassType = {
  date: string;
  time: string;
  duration: number;
  trainer: Types.ObjectId;
  trainees: Types.ObjectId[];
  maxTrainees: number;
};

const classSchema = new Schema<ClassType>(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: Number, default: 2 },
    trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trainees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    maxTrainees: { type: Number, default: 10 },
  },
  { timestamps: true }
);

// Ensure unique schedules per day and time
classSchema.index({ date: 1, time: 1 }, { unique: true });
const Class = model<ClassType>("Class", classSchema);

export default Class;
