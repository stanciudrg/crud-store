import express from "express";
import { connect } from "../db.js";

const cart = express.Router();

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

cart.post("/store/cart", async (request, response) => {
  try {
    const database = await connect();
    const cartCollection = database.collection("cart");
    const newCart = request.body;
    await cartCollection.deleteMany({});

    if (newCart.length === 0) return;

    await cartCollection.insertMany(newCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    response.status(500).send("Error updating cart");
  }
});

export default cart;
