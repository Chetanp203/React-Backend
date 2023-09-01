import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import morgan from "morgan";
import { getCurrentUser, getNumber, login, register, sendOtp, verifyOtp } from "./Controllers/User-controller.js";
import { addProduct, addRating, allProducts, deleteYourProduct, getYourProducts, updateYourProduct } from "./Controllers/Product-controller.js";
import { checkAdmin, checkSeller, isValidUser } from "./Middlewares/All.Middleware.js";
import { addComments, addToCart, addToWishlist, deleteFromCart, getCartProducts, getWishlistProducts } from "./Controllers/Buyers-controller.js";
import { blockProduct, blockUser, getAllBuyers, getAllProducts, getAllSellers, getBlockedProducts, getUnverifiedProducts, getverifiedProducts, unBlockUser, unblockProduct, verifyProduct } from "./Controllers/Admin-controller.js";
import routeIndex from './routes/indeix.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

app.get("/", function(req,res){
    res.send("Working")
})

//All//

app.use('/api/v1',routeIndex)

//buyer//



//seller//





//admin//






mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error while connecting to MongDB",error)
})

app.listen(8000,()=>{
    console.log("Listening from sever 8000")
})