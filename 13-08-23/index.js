import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import morgan from "morgan";
import { getCurrentUser, login, register } from "./Controllers/User-controller.js";
import { addProduct, addRating, allProducts, deleteYourProduct, getYourProducts, updateYourProduct } from "./Controllers/Product-controller.js";
import { checkAdmin, checkSeller, isValidUser } from "./Middlewares/All.Middleware.js";
import { addComments, addToCart, addToWishlist, deleteFromCart, getCartProducts, getWishlistProducts } from "./Controllers/Buyers-controller.js";
import { blockProduct, blockUser, getAllBuyers, getAllProducts, getAllSellers, getBlockedProducts, getUnverifiedProducts, getverifiedProducts, unBlockUser, unblockProduct, verifyProduct } from "./Controllers/Admin-controller.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

app.get("/", function(req,res){
    res.send("Working")
})

app.post("/register",register)
app.post("/login",login)
app.post("/get-current-user",getCurrentUser)
app.get("/all-products", allProducts)

//buyer//
app.patch('/add-rating',isValidUser, addRating)
app.post("/add-to-cart",addToCart)
app.delete("/delete-from-cart",deleteFromCart)
app.get("/get-cart-products",getCartProducts)
app.post("/add-to-wishlist",addToWishlist)
app.get("/get-wishlist-products",getWishlistProducts)
app.patch('/add-comments',isValidUser, addComments)


//seller//

app.post("/add-product",checkSeller, addProduct)
app.post("/get-your-products",checkSeller, getYourProducts)
app.patch("/update-your-product",checkSeller, updateYourProduct)
app.delete("/delete-your-product",checkSeller,deleteYourProduct)



//admin//

app.patch("/block-user",checkAdmin,blockUser)
app.patch("/unblock-user",checkAdmin,unBlockUser)
app.patch("/block-product",checkAdmin,blockProduct)
app.patch("/unblock-product",checkAdmin,unblockProduct)
app.get('/get-all-buyers', checkAdmin, getAllBuyers)
app.get('/get-all-sellers', checkAdmin, getAllSellers)
app.get('/get-all-products', checkAdmin, getAllProducts)
app.patch("/verify-product",checkAdmin,verifyProduct)
app.get("/get-verify-product", checkAdmin, getverifiedProducts)
app.get("/get-unverified-product", checkAdmin, getUnverifiedProducts)
app.get("/get-blocked-product", checkAdmin, getBlockedProducts)





mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error while connecting to MongDB",error)
})

app.listen(8000,()=>{
    console.log("Listening from sever 8000")
})