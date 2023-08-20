import ProductModal from "../Modal/Product-modal.js";
import UserModal from "../Modal/User-modal.js";

export const blockUser =async (req,res)=>{
    try{
        const {userId} = req.body;

        const user = await UserModal.findByIdAndUpdate(userId,{isBlocked:true},{new:true})

        if(user){
            return res.status(200).json({success: true,message:"User Blocked Successfully",user:user})
        }
        throw new Error("Internal Error, Please try again..")

    }catch(error){
        return res.status(500).json({status:"error", error: error.message})
    }
}


export const unBlockUser =async (req,res)=>{
    try{
        const {userId} = req.body;

        const user = await UserModal.findByIdAndUpdate(userId,{isBlocked : false},{new:true})

        if(user){
            return res.status(200).json({success: true,message:"User unBlocked Successfully",user:user})
        }
        throw new Error("Internal Error, Please try again..")

    }catch(error){
        return res.status(500).json({status:"error", error: error.message})
    }
}

export const blockProduct =async (req,res)=>{
    try{
        const {productId} = req.body;

        const product = await ProductModal.findByIdAndUpdate(productId,{isProductBlocked:true},{new:true})

        if(product){
            return res.status(200).json({success: true,message:"Product Blocked Successfully",product:product})
        }
        throw new Error("Internal Error, Please try again..")

    }catch(error){
        return res.status(500).json({status:"error", error: error.message})
    }
}


export const unblockProduct =async (req,res)=>{
    try{
        const {productId} = req.body;

        const product = await ProductModal.findByIdAndUpdate(productId,{isProductBlocked:false},{new:true})

        if(product){
            return res.status(200).json({success: true,message:"Product unBlocked Successfully",product:product})
        }
        throw new Error("Internal Error, Please try again..")

    }catch(error){
        return res.status(500).json({status:"error", error: error.message})
    }
}


export const verifyProduct =async (req,res)=>{
    try{
        const {productId} = req.body;

        const product = await ProductModal.findByIdAndUpdate(productId,{isVerified:true},{new:true})

        if(product){
            return res.status(200).json({success: true,message:"Product verified Successfully",product:product})
        }
        throw new Error("Internal Error, Please try again..")

    }catch(error){
        return res.status(500).json({status:"error", error: error.message})
    }
}

export const getAllBuyers =async (req,res) =>{
    try{
        const buyer = await UserModal.find({role:"Buyer"})

        if(!buyer){
            return res.status(404).json({success:false,message:"No users found"})
        }
        return res.status(200).json({success:true,Buyers: buyer})
         
        

    }catch(error){
        return res.status(500).json({status: error, message:error})
    }
}


export const getAllSellers =async (req,res) =>{
    try{
        const seller = await UserModal.find({role:"Seller"})

        if(!seller){
            return res.status(404).json({success:false,message:"No users found"})
        }
        return res.status(200).json({success:true,Sellers:seller})
         
        

    }catch(error){
        return res.status(500).json({status: error, message:error})
    }
}


export const getAllProducts =async (req,res) =>{
    try{
        const product = await ProductModal.find({})

        if(!product){
            return res.status(404).json({success:false,message:"No users found"})
        }
        return res.status(200).json({success:true,Products: product})
         
        

    }catch(error){
        return res.status(500).json({status: error, message:error})
    }
}


export const getverifiedProducts =async (req,res) =>{
    try{
        const product = await ProductModal.find({isVerified:true})

        if(!product){
            return res.status(404).json({success:false,message:"No users found"})
        }
        return res.status(200).json({success:true,Products: product})
         
        

    }catch(error){
        return res.status(500).json({status: error, message:error})
    }
}


export const getUnverifiedProducts =async (req,res) =>{
    try{
        const product = await ProductModal.find({isVerified:false})

        if(!product){
            return res.status(404).json({success:false,message:"No users found"})
        }
        return res.status(200).json({success:true,Products: product})
         
        

    }catch(error){
        return res.status(500).json({status: error, message:error})
    }
}


export const getBlockedProducts =async (req,res) =>{
    try{
        const product = await ProductModal.find({isProductBlocked:true})

        if(!product){
            return res.status(404).json({success:false,message:"No users found"})
        }
        return res.status(200).json({success:true,Products: product})
         
        

    }catch(error){
        return res.status(500).json({status: error, message:error})
    }
}