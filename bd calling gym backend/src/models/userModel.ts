import { model, Schema } from "mongoose";

type UserType = {
  fullName: string;
  email: string;
  password: string;
  role: "admin" | "trainer" | "trainee";
};

const userSchema = new Schema<UserType>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "trainer", "trainee"], required: true },
});

const User = model<UserType>("User", userSchema);

export default User;
