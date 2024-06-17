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
    const newSortMethod = request.body.sortMethod;

    const updateResult = await settingsCollection.updateOne(
      { type: "sortMethod" },
      {
        $set: { sortMethod: newSortMethod },
      }
    );

    // Check if the data was updated successfully
    if (updateResult.modifiedCount === 1) {
      console.log("Document updated successfully");
      return;
    }

    // If data was not found, create collection and document
    if (updateResult.matchedCount === 0) {
      console.log("Data not found, creating data...");
      const insertResult = await settingsCollection.insertOne({
        type: "sortMethod",
        sortMethod: newSortMethod,
      });
      console.log("Data created and added to database");
    }
  } catch (error) {
    console.error("Error updating settings:", error);
    response.status(500).send("Error updating settings");
  }
});

export default settingsRouter;
