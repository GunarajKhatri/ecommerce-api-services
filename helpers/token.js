
import jwt from "jsonwebtoken";
import User from "../Models/User.js"

export const GenerateAccessToken=async(id)=>{
    const user=await User.findOne({_id:id});
    const {_id,email}=user;
    const payload={
        _id,email
    };
    return jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn:60});
}
export const GenerateRefreshToken=async(id)=>{
    const user=await User.findOne({_id:id});
    const {_id,email}=user;
    const payload={
        _id,email
    };
    return jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:60});
}