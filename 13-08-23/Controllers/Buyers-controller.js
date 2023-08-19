import ProductModal from "../Modal/Product-modal.js";
import UserModal from "../Modal/User-modal.js";
import jwt from "jsonwebtoken"

export const addToCart =async (req,res)=>{
    try{
        const {token, productId} =req.body;
        if(!token || !productId) return res.status(404).json({status:"error",message:"Token & ProductID mandatory"})

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

     if(!decodedData){
         return res.status(404).json({status:"error",message:"Token not valid"});
     }
  
      const userId = decodedData.userID;

      const user = await UserModal.findById({_id:userId})

      user?.cart.push(productId);

      await user.save();
      return res.status(200).json({success:true, user: user})
 

    }catch(error){
        return res.status(500).json({status:"error", error: error.message})
    }
}

export const getCartProducts =async (req,res)=>{
    try {
        const {token}= req.body;
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedData){
            return res.status(404).json({status:"error",message:"Token not valid"});
        }
     
         const userId = decodedData.userID;
   
         const user = await UserModal.findById({_id:userId})

         if(user){
            let finalData =[];
            for(let i=0;i< user.cart.length;i++){
                const product = await ProductModal.findById(user.cart[i])
                if(product){
                    finalData.push(product)
                }
            }
            return res.status(200).json({success:true,products:finalData})
         }
      throw new ("User not found")
    } catch (error){
        return res.status(500).json({status:"error", error: error.message})
    }
}


export const addToWishlist =async (req,res)=>{
    try{
        const {token, productId} =req.body;
        if(!token || !productId) return res.status(404).json({status:"error",message:"Token & ProductID mandatory"})

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

     if(!decodedData){
         return res.status(404).json({status:"error",message:"Token not valid"});
     }
  
      const userId = decodedData.userID;

      const user = await UserModal.findById({_id:userId})

      user?.wishlist.push(productId);

      await user.save();
      return res.status(200).json({success:true, user: user})
 

    }catch(error){
        return res.status(500).json({status:"error", error: error.message})
    }
}

export const getWishlistProducts =async (req,res)=>{
    try {
        const {token}= req.body;
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedData){
            return res.status(404).json({status:"error",message:"Token not valid"});
        }
     
         const userId = decodedData.userID;
   
         const user = await UserModal.findById({_id:userId})

         if(user){
            let finalData =[];
            for(let i=0;i< user.wishlist.length;i++){
                const product = await ProductModal.findById(user.wishlist[i])
                if(product){
                    finalData.push(product)
                }
            }
            return res.status(200).json({success:true,products:finalData})
         }
      throw new ("User not found")
    } catch (error){
        return res.status(500).json({status:"error", error: error.message})
    }
}


export const deleteFromCart =async (req,res)=>{
    try{
        const {token, productId} =req.body;
        if(!token || !productId) return res.status(404).json({status:"error",message:"Token & ProductID mandatory"})

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

     if(!decodedData){
         return res.status(404).json({status:"error",message:"Token not valid"});
     }
  
      const userId = decodedData.userID;

      const user = await UserModal.findById({_id:userId})

      const cart=user.cart
     const removeItem=cart.indexOf(productId)
     cart.splice(removeItem,1)
      await user.save();
      return res.status(200).json({success:true, user: user})
 

    }catch(error){
        return res.status(500).json({status:"error", error: error.message})
    }
}