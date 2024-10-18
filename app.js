import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import routes from "./Routes/index.js";
import jwtStrategy from "./config/passport.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"; 


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

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// const user=new User({
//   username:"guna",
//   email:"hello@gmail.com",
//   password:"1234567"
// });
// user.save((error)=>{
// const todo=new Todo({
// list:"play volleyball",
// author:user._id
// });
// const todo1=new Todo({
//   list:"play football",
//   author:user._id
//   });
// todo.save();
// todo1.save();
// })

// Todo.find({ author:'634b765760e39cd566ca9106'}).
//   exec(function (err, todo) {
//    // if (err) return handleError(err);
//     console.log(`${todo[0].list} ${todo[1].list}`);
//     // prints "The author is Ian Fleming"
//   })

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
