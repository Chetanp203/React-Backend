import jwt from "jsonwebtoken";
import ProductModal from "../Modal/Product-modal.js";
import UserModal from "../Modal/User-modal.js";

export const addProduct = async (req,res)=>{
    
    try{
     const {name, price, image, category} = req.body.productData;
     const {token} = req.body;
     if(!name || !price || !image || !category || !token) return res.status(404).json({success:false,message:"All fields are mandatory"})
    
     const decodedData = jwt.verify(token, process.env.JWT_SECRET)

     if(!decodedData){
         return res.status(404).json({success:false,message:"Token not valid"});
     }
  
      const userId = decodedData.userID;
 
      

    const product = new ProductModal({name, price, image, category,userId:userId});

    await product.save();

    return res.status(201).json({success:true,message:"Product added succefully"})

    }catch(error){
        return res.status(500).json({success:false, error: error.message})
    }
}


export const allProducts =async (req,res)=>{
    try{
        const products = await ProductModal.find({});
        console.log(products,"products all products")
        if(products?.length){
            return res.status(200).json({success:true,products: products})
        }
        return res.status(404).json({success:false,message:"No products found"})

    }catch(error){
        return res.status(500).json({success:false, message: error.message})
    }
}


export const getYourProducts= async (req,res)=>{
    try{
        const {token}= req.body;
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

     if(!decodedData){
         return res.status(404).json({success:false,message:"Token not valid"});
     }
  
      const userId = decodedData.userID;
        
      const yourProductData = await ProductModal.find({userId:userId})

      if(yourProductData.length){
        return res.status(200).json({success:true,products: yourProductData})
      }
      return res.status(404).json({success:false,message:"No products found.."})

    }catch(error){
        return res.status(500).json({success:false,error:error.message})
    }
}

export const updateYourProduct = async (req,res)=>{
    try{
    const {productId,name,image,price,category,token}= req.body;
    if(!token) return res.status(404).json({status:"error",message:"Token is mandatory"})

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    if(!decodedData){
        return res.status(404).json({status:"error",message:"Token not valid"});
    }
 
     const userId = decodedData.userID;
   
    const updatedProduct = await ProductModal.findOneAndUpdate({_id: productId,userId:userId},{name,image,price,category},{new: true})

    if(updatedProduct){
        return res.status(200).json({staus:"Success",product: updatedProduct})
    }
    return res.status(404).json({status:"error",message:"Access denied unauthorised user "})

    }catch(error){
        return res.status(500).json({status:"error", error:error.message})
    }
}


export const deleteYourProduct =async (req,res)=>{
    try{
        const {productId, token} =req.body;

        if(!productId) return res.status(404).json({status:"error",message:"Product ID is mandatory.."})

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedData){
            return res.status(404).json({status:"error",message:"Token not valid"});
        }
     
         const userId = decodedData.userID;

         const isDeleted = await ProductModal.findOneAndDelete({_id: productId, userId: userId })
         if(isDeleted){
            return res.status(200).json({success: true, message:"Product deleted successfully"})
         }

         throw new Error("MongoDB error")

    }catch(error){
        return res.status(500).json({status:"error", error:error.message})
    }
}


export const addRating=async(req,res)=>{
    try{
        const {productId, rating}=req.body;

        const updatedProductRating = await ProductModal.findByIdAndUpdate(productId, { $push: { ratings: rating } }, { new: true })

        if (updateYourProduct) {
            return res.status(200).json({ success: true, message: "Rating added Successfully", product: updatedProductRating })
        }
        throw new Error("Mongodb error")

    }catch(error){
        return res.status(500).json({status:"error", error:error.message})
    }
}