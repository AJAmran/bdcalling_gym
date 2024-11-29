import express, { Application } from "express";
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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/users", userRoutes);

// Global Error Handler
app.use(errorMiddleware);

export default app;
