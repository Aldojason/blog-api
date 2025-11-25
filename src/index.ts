import express, { Application, Request, Response } from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes";



const app: Application = express();
const PORT = 5000;

// Middleware
app.use(cors());  
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Blog API");
});

import { errorHandler } from "./middleware/errorHandler";
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
