import { model, Schema, Types } from "mongoose";

type ClassType = {
  date: Date;
  time: string;
  trainer: Types.ObjectId;
  trainees: Types.ObjectId[];
  maxTrainees: number;
};

const classSchema = new Schema<ClassType>(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trainees: [{ type: Schema.Types.ObjectId, ref: "User" }],
    maxTrainees: { type: Number, default: 10 },
  },
  { timestamps: true }
);

// Ensure unique schedules per day and time
const Class = model<ClassType>("Class", classSchema);
export default Class;
