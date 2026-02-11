import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "evreb";

if (!uri) {
  console.warn("MONGODB_URI not set. Metrics API will be disabled.");
}

export async function getMongoDb(): Promise<Db | null> {
  if (!uri) return null;

  if (cachedDb && cachedClient) {
    return cachedDb;
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  cachedClient = client;
  cachedDb = db;
  return db;
}

export async function closeMongo(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}
