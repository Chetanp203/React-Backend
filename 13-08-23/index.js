import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { getCurrentUser, login, register } from "./Controllers/User-controller.js";
import { addProduct, allProducts, deleteYourProduct, getYourProducts, updateYourProduct } from "./Controllers/Product-controller.js";
import { checkSeller } from "./Middlewares/Seller.Middleware.js";
import { addToCart, addToWishlist, deleteFromCart, getCartProducts, getWishlistProducts } from "./Controllers/Buyers-controller.js";


const app = express();
dotenv.config();
app.use(express.json())

app.get("/", function(req,res){
    res.send("Working")
})

app.post("/register",register)

app.post("/login",login)

app.post("/get-current-user",getCurrentUser)

app.get("/all-products", allProducts)

//buyer//

app.post("/add-to-cart",addToCart)

app.delete("/delete-from-cart",deleteFromCart)

app.get("/get-cart-products",getCartProducts)

app.post("/add-to-wishlist",addToWishlist)

app.get("/get-wishlist-products",getWishlistProducts)


//seller//

app.post("/add-product",checkSeller, addProduct)

app.get("/get-your-products",checkSeller, getYourProducts)

app.patch("/update-your-product",checkSeller, updateYourProduct)

app.delete("/delete-your-product",checkSeller,deleteYourProduct)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error while connecting to MongDB",error)
})

app.listen(8000,()=>{
    console.log("Listening from sever 8000")
})