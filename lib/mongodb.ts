import { MongoClient, Db } from "mongodb";

let cached: { client: MongoClient; db: Db } | undefined;

export async function connectToDatabase() {
  if (cached) return cached;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // Defer throwing until runtime when connect is actually attempted.
    throw new Error("Please define the MONGODB_URI environment variable in .env.local or the hosting provider settings");
  }

  const client = new MongoClient(uri as string);
  await client.connect();
  const db = client.db();

  cached = { client, db };
  return cached;
}

export default connectToDatabase;
