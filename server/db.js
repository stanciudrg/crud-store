import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const CONNECTION_STRING = process.env.CONNECTION_STRING;

let database = null;

export async function connect() {
  if (database) return database;

  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    database = client.db();
    console.log("Successfully connected to database");
    return database;
  } catch (error) {
    console.error("Failed connecting do database:", error);
    throw error;
  }
}
