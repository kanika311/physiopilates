import mongoose from "mongoose";

const MONGODB_URI =
  process.env.mongourl!;

if (!MONGODB_URI) {
  throw new Error(
    "mongodb+srv://<db_username>:<db_password>@billing.lqel6zg.mongodb.net/?appName=billing"
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(
      MONGODB_URI
    );
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectDB;