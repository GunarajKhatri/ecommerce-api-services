import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  username:{
        type:String,
        required:[true,"Username is required!!"]
  },
  email:{
    type:String,
    required:[true,"Email is required!!"]
  },
  password:{
    type:String,
    min:6,
    required:[true,"Password is required!!"],
    select:true
  },
});
UserSchema.set("toJSON",{
  transform:(doc,{__v,password,...rest},options) => rest
});
const User = mongoose.model('User', UserSchema);
export default User