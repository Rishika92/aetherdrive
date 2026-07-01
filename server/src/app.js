import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import folderRoutes from "./routes/folder.routes.js";
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
export default app;