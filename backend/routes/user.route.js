require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const upload = require("../middleware/upload");
const userRouter = express.Router();

userRouter.post("/api/register", upload.single("avatar"), async (req, res) => {
  const { name, email, password } = req.body;
  let avatar;
  if (req.file) {
    avatar = req.file ? req.file.path : "";
  }
  try {
    const existinguser = await UserModel.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ msg: "use another mail this is already there!" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new UserModel({
          name,
          email,
          avatar,
          password: hash,
        });
        await user.save();
        res.status(201).json({ msg: "you are now registerd!", user });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

userRouter.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await UserModel.findOne({ email });
    bcrypt.compare(password, existinguser.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userId: existinguser._id },
          process.env.secretkey
        );
        res
          .status(201)
          .json({ mag: "Login Sucess!", token: token, existinguser });
      } else {
        res.status(401).json({ err: err.message });
      }
    });
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

module.exports = { userRouter };
