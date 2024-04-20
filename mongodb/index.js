const env = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

env.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE)
  .then(console.log("db connected"));

const User = mongoose.model('Users', {name: String, email: String, password: String});

app.post("/signup", async function(req, res) {
  const {username, password, name} = req.body;

  const existingUser = await User.findOne({email: username});

  if (existingUser) {
    return res.status(400).send("user already exists!");
  }

  const user = new User({
    name,
    email: username,
    password
  });

  user.save();
  const token = jwt.sign({ email: username }, jwtPassword);
  return res.json({
    "msg": "User created successfully",
    token
  });
})

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

