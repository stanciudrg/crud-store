import express from "express";
import { connect } from "../db.js";

const productsRouter = express.Router();

// Fetch the products collection and transform it into an array of product objects
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

// Replace the entire products collection with a the new array of product objects
productsRouter.post("/store/products", async (request, response) => {
  try {
    const database = await connect();
    const productsCollection = database.collection("products");
    const newProducts = request.body;
    // Empty the collection
    await productsCollection.deleteMany({});

    // Do not attempt to insert an array of empty products, the collection is already empty
    if (newProducts.length === 0) return;

    await productsCollection.insertMany(newProducts);
  } catch (error) {
    console.error("Error updating products:", error);
    response.status(500).send("Error updating products");
  }
});

export default productsRouter;
