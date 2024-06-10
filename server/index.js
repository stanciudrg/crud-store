import express from "express";
import cors from "cors";
import multer from "multer";
import { connect } from "./db.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import settingsRouter from "./routes/settings.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(productsRouter);
app.use(cartRouter);
app.use(settingsRouter);

app.listen(5038, async () => {
  try {
    await connect();
    console.log("Successfully started the server");
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
});
