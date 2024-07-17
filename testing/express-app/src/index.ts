import express from "express";

export const app = express();
app.use(express.json());

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  const answer = a + b;

  res.json({
    answer,
  });
});
