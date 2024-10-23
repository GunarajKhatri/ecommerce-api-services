import jwt from "jsonwebtoken";

// Generate Access Token
export const GenerateAccessToken = (id, email, role) => {
  const payload = { _id: id, email, role }; // Include only necessary info
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" }); // Expiry can be 15 minutes
};

// Generate Refresh Token
export const GenerateRefreshToken = (id) => {
  const payload = { _id: id };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" }); // Expiry can be 7 days
};
