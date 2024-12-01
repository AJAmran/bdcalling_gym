import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import classRoutes from "./routes/classRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();
connectDB();

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(`
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif;">
      <h1 style="color: #0056A0; font-size: 2rem;">🌟 Welcome to the Gym Management System 🌟</h1>
      <p style="color: #555; font-size: 1.2rem;">Manage classes, users, and enrollments with ease!</p>
      <p style="color: #333; font-size: 1rem;">Explore our <a href="/api/docs" style="color: #0056A0; text-decoration: none;">API documentation</a> to get started.</p>
    </div>
  `);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/users", userRoutes);

// Global Error Handler
app.use(errorMiddleware);

export default app;
