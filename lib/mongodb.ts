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
    cached.promise = mongoose.connect(MONGODB_URI, {
      // Keep a warm pool of sockets so requests don't re-handshake.
      maxPoolSize: 10,
      minPoolSize: 1,
      // Fail fast instead of hanging if the cluster is unreachable.
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      // Don't queue queries before the connection is ready — surface errors.
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset so the next request can retry instead of reusing a rejected promise.
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;