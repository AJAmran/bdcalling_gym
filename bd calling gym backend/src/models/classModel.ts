import { model, Schema, Types } from "mongoose";

type ClassType = {
  date: Date;
  time: string;
  trainer: Types.ObjectId;
  trainees: Types.ObjectId[];
};

const classSchema = new Schema<ClassType>({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  trainees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Class = model<ClassType>("Class", classSchema);

export default Class;
