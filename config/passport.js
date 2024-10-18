
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../Models/User.js";

const options = {
  secretOrKey: process.env.JWT_ACCESS_SECRET || "access secret code", 
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
};

// Token verification callback
const token = async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (user) {
      return done(null, user); // User found, return it
    }
    return done(null, false); // User not found
  } catch (error) {
    console.error("Error during token verification:", error); // Log error
    return done(error, false); // Return error
  }
};


const jwtStrategy = new JwtStrategy(options, token);
export default jwtStrategy;
