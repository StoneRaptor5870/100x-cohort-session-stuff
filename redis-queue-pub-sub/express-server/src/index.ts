import express from "express";
import { createClient, RedisClientType } from "redis";

const app = express();
app.use(express.json());

const client: RedisClientType = createClient({
  url: "redis://127.0.0.1:6379",
});
client.on("error", (err) => console.log("Redis Client Error", err));

app.post("/submit", async (req, res) => {
  const { problemId, code, language } = req.body;

  try {
    await client.lPush(
      "problems",
      JSON.stringify({ code, language, problemId })
    );
    // Store in the database
    res.status(200).send("Submission received and stored.");
  } catch (error) {
    console.error("Redis error:", error);
    res.status(500).send("Failed to store submission.");
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

startServer();
