import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { GenerateAccessToken, GenerateRefreshToken } from "../helpers/token.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(406).json({ messsage: "User already exist!!" });
    return;
  }
  // hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "User created successfully!!" });
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(406).json({ message: "credentials not found u" });
    return;
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    res.status(406).json({ message: "credentials not found p" });
    return;
  }
  // const payload = {
  //         _id: user._id,
  //         email
  // };
  // const token = jwt.sign(payload, "secret");

  const access_token = await GenerateAccessToken(user._id);
  const refresh_token = await GenerateRefreshToken(user._id);
  res
    .status(200)
    .json({
      message: "Logged in successfully!!",
      access_token,
      refresh_token,
      user,
    });
};

export const generateNewTokens = async (req, res) => {
  if (!req.headers["authorization"])
    return res.status(401).json({ message: "unauthorized" });
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(token,"refresh secret code", async(err, payload) => {
    if (err) {
      const message =
        err.name === "TokenExpiredError" ? "Unauthorized" : err.message;
      return res.status(401).json({message});
      console.log(err.name)
    }
  
    const access_token = await GenerateAccessToken(payload._id);
    const refresh_token = await GenerateRefreshToken(payload._id);
    res
    .status(200)
    .json({
      access_token,
      refresh_token
    });
  });
};
