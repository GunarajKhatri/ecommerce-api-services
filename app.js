import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import routes from "./Routes/index.js";
import jwtStrategy from "./config/passport.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware configuration
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
passport.use("jwt", jwtStrategy);

// Routes
app.use("/api", routes);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
