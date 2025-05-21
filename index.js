import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

// env config
dotenv.config();

// mongoDB connection
connectDB();

// variables
const app = express();
const PORT = process.env.PORT || 8080;
const MODE = process.env.DEV_MODE || "Development";

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// port
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} and ${MODE} mode - http://localhost:${PORT} `
      .bgCyan.black.bold
  );
});
