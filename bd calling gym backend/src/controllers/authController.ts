import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtHelper";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: "trainee",
    });
    const { _id } = newUser;
    res.status(201).json({
      success: true,
      user: {
        _id,
        fullName,
        email,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = generateToken({ id: user._id, role: user.role });
  res.status(200).json({ success: true, token });
};
