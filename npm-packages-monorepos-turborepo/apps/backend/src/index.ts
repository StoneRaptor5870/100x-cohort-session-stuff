import express from "express";
import { URL } from "@repo/common/config"

const app = express()

console.log(URL);

app.get("/", (req, res) => {
  res.json({
    message: "hello world"
  });
})

app.listen(4000);