import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./Routes/index.js";
import passport from "passport";
import jwt from "./config/passport.js";
import cors from "cors";

mongoose
  .connect("mongodb://127.0.0.1:27017/hello")
  .then(() => {
    console.log("DB connection is successfull!");
  })
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use(cors({
  origin: "*"
}));
app.use("/api", routes);
passport.use("jwt", jwt);



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







app.get("/", (req, res) => {
  res.send("hello world!!");
});

app.listen(5001, () => {
  console.log("Server is running at http://localhost:5001");
});
