import jwt from "jsonwebtoken";
import ProductModal from "../Modal/Product-modal.js";
import UserModal from "../Modal/User-modal.js";

export const addProduct = async (req,res)=>{
    
    try{
     const {name, price, image, category,token} = req.body;
     if(!name || !price || !image || !category || !token) return res.status(404).json({status:"error",message:"All fields are mandatory"})


    const product = new ProductModal({name, price, image, category});

    await product.save();

    return res.status(201).json({status:"success",message:"Product added succefully"})

    }catch(error){
        return res.status(500).json({status:"error", error: error.message})
    }
}