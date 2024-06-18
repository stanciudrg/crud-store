import express from "express";
import { connect } from "../db.js";

const cart = express.Router();

// Fetch the cart collection and transform it into an array of cartProduct objects
cart.get("/store/cart", async (request, response) => {
  try {
    const database = await connect();
    const cartCollection = database.collection("cart");
    const cartData = await cartCollection.find().toArray();
    response.send(cartData);
  } catch (error) {
    console.error("Error fetching cart:", error);
    response.status(500).send("Error fetching cart");
  }
});

// Replace the entire cart collection with a the new array of cartProduct objects
cart.post("/store/cart", async (request, response) => {
  try {
    const database = await connect();
    const cartCollection = database.collection("cart");
    const newCart = request.body;
    // Empty the collection
    await cartCollection.deleteMany({});

    // Do not attempt to insert an array of empty products, the collection is already empty
    if (newCart.length === 0) return;

    await cartCollection.insertMany(newCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    response.status(500).send("Error updating cart");
  }
});

export default cart;
