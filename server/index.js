import express from "express";
import cors from "cors";
import multer from "multer";
import { connect } from "./db.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import settingsRouter from "./routes/settings.js";

// Middlewares
const app = express();
// Enables cross-origin resource sharing
app.use(cors());
// Parses incoming request with JSON payloads
app.use(express.json());

// Define API routes
app.use(productsRouter);
app.use(cartRouter);
app.use(settingsRouter);

// Connect to MongoDB on the 5038 port
app.listen(5038, async () => {
  try {
    await connect();
    console.log("Successfully started the server");
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
});
