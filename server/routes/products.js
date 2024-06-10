import express from "express";
import { connect } from "../db.js";

const productsRouter = express.Router();

productsRouter.get("/store/products", async (request, response) => {
  try {
    const database = await connect();
    const productsCollection = database.collection("products");
    const productsData = await productsCollection.find().toArray();
    response.send(productsData);
  } catch (error) {
    console.error("Error fetching products:", error);
    response.status(500).send("Error fetching products");
  }
});

productsRouter.post("/store/products", async (request, response) => {
  try {
    const database = await connect();
    const productsCollection = database.collection("products");
    const newProducts = request.body;
    await productsCollection.deleteMany({});

    if (newProducts.length === 0) return;

    await productsCollection.insertMany(newProducts);
  } catch (error) {
    console.error("Error updating products:", error);
    response.status(500).send("Error updating products");
  }
});

export default productsRouter;
