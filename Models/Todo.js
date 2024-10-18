import mongoose from "mongoose";
const { Schema } = mongoose;

const TodoSchema = new Schema({
  list: {
    type: String,
    required: [true, "todo-task is required"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
