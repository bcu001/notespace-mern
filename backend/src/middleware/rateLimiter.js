import ratelimit from "../config/upstash.js"
import { sendResponse } from "../utils/apiResponse.js";

const rateLimiter = async(req,res,next)=>{
    try{
        const {success} = await ratelimit.limit("my-limit-key"); // can use userid for individual user ratelimt or ip address

        if(!success){
            return sendResponse(res,429,"Too many request")
        }
        next();
    } catch(error){
        console.log("Rate limit error: ", error);
        next(error);
    }
}

export default rateLimiter;