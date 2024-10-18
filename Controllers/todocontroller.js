import  Todo from "../Models/Todo.js"

export const index=async(req,res)=>{
  const todos=await Todo.find({});
  res.json({data:todos});
}

export const create= async(req,res )=>{
    const { list }=req.body;
    const todo=new Todo({list});
    await todo.save();
    res.json({ message: "list is created successfully!!" });
}

export const destroy = async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id });
    res.json({ message: "list is deleted successfully!!" });
  };
  
  export const update = async (req, res) => {
    await Todo.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "list is updated successfully!!" });
  };