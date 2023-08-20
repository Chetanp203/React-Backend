import jwt from "jsonwebtoken";
import UserModal from "../Modal/User-modal.js";

export const checkSeller = async (req,res,next)=>{
    try{
      const {token} = req.body;
 
      if(!token) return res.status(404).json({status:"error",message:"Token is mandatory"})
          
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    if(!decodedData){
        return res.status(404).json({status:"error",message:"Token not valid"});
    }
 
     const userId = decodedData.userID;
     

     const user = await UserModal.findById(userId);


     if(!user || user?.role !== "Seller"){
        return res.status(404).json({status:"error",message:"User not valid to add product from middleware"})
     }

     next();
    }catch(error){
        return res.status(500).json({status : "error", error : error.message})
    }
}

export const checkAdmin = async (req,res,next)=>{
    try{
      const {token} = req.body;
 
      if(!token) return res.status(404).json({status:"error",message:"Token is mandatory"})
          
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    if(!decodedData){
        return res.status(404).json({status:"error",message:"Token not valid"});
    }
 
     const userId = decodedData.userID;
     

     const user = await UserModal.findById(userId);

     if(!user || user?.role !== "Admin"){
        return res.status(404).json({status:"error",message:"User not valid to add product from middleware"})
     }

     next();
    }catch(error){
        return res.status(500).json({status : "error", error : error.message})
    }
}




export const isValidUser = async (req,res,next)=>{
    try{
      const {token} = req.body;
 
      if(!token) return res.status(404).json({status:"error",message:"Token is mandatory"})
          
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    if(!decodedData){
        return res.status(404).json({status:"error",message:"Token not valid"});
    }
 
     const userId = decodedData.userID;
     

     const user = await UserModal.findById(userId);

     if(!user){
        return res.status(404).json({status:"error",message:"User not valid to add product from middleware"})
     }

     next();
    }catch(error){
        return res.status(500).json({status : "error", error : error.message})
    }
}


