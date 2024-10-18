
import { Strategy,ExtractJwt } from "passport-jwt";
import User from "../Models/User.js";
const options = {
    secretOrKey:"access secret code",
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
  }  

  const token=async (payload, done)=>{
    try {
        const user=await User.findById(payload._id);
        if(user){
            return done(null, user);
        }
        return done(null,false);
    } catch (error) {
        return done(error, false);
    }
  }
  const jwt=new Strategy(options,token);
  export default jwt