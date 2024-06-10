import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DATABASE_NAME = process.env.DATABASE_NAME;

let database = null;

export async function connect() {
  console.log(CONNECTION_STRING);
  if (database) return database;

  try {
    const client = await MongoClient.connect(CONNECTION_STRING);
    database = client.db(DATABASE_NAME);
    console.log("Successfully connected to database");
    return database;
  } catch (error) {
    console.error("Failed connecting do database:", error);
    throw error;
  }
}
