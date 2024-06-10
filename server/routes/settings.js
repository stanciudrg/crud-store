import express from "express";
import { connect } from "../db.js";
import { ObjectId } from "mongodb";

const settingsRouter = express.Router();

settingsRouter.get("/store/settings", async (request, response) => {
  try {
    const database = await connect();
    const settingsCollection = database.collection("settings");
    const settingsData = await settingsCollection.find().toArray();
    response.send(settingsData);
  } catch (error) {
    console.error("Error fetching settings:", error);
    response.status(500).send("Error fetching settings");
  }
});

settingsRouter.post("/store/settings", async (request, response) => {
  try {
    const database = await connect();
    const settingsCollection = database.collection("settings");
    const sortMethod = request.body.sortMethod;

    const filter = { _id: new ObjectId("6666e2172d31177707abcb2a") };
    const update = { $set: { sortMethod: sortMethod } };
    const result = await settingsCollection.updateOne(filter, update);

    // Check if the document was updated successfully
    if (result.modifiedCount === 1) {
      console.log("Document updated successfully");
    } else {
      console.log("Document not found or not updated");
    }
  } catch (error) {
    console.error("Error updating settings:", error);
    response.status(500).send("Error updating settings");
  }
});

export default settingsRouter;
