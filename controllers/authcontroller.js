import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { GenerateAccessToken, GenerateRefreshToken } from "../helpers/token.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    address,  
  } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      address: address || {},
      cart: {
        items: [],
        cartTotalPrice: 0,
      },
      orders: [],
    });

    return res
      .status(201)
      .json({ message: "User created successfully!", userId: newUser._id });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password"); // Including password explicitly as select is false
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    // Generate tokens (access and refresh)
    const access_token = GenerateAccessToken(user._id, user.email, user.role);
    const refresh_token = GenerateRefreshToken(user._id);

    // res.cookie("refresh_token", refresh_token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    //   sameSite: "Strict", // To prevent CSRF
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    res.status(200).json({
      message: "Logged in successfully!!",
      access_token,
      refresh_token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res
      .status(500)
      .json({
        message: "An error occurred during login",
        error: error.message,
      });
  }
};

export const generateNewTokens = async (req, res) => {
  if (!req.headers["authorization"])
    return res.status(401).json({ message: "unauthorized" });
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(token, "refresh secret code", async (err, payload) => {
    if (err) {
      const message =
        err.name === "TokenExpiredError" ? "Unauthorized" : err.message;
      return res.status(401).json({ message });
      console.log(err.name);
    }

    const access_token = await GenerateAccessToken(payload._id);
    const refresh_token = await GenerateRefreshToken(payload._id);
    res.status(200).json({
      access_token,
      refresh_token,
    });
  });
};
