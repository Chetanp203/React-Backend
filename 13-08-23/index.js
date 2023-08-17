import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { getCurrentUser, login, register } from "./Controllers/User-controller.js";
import { addProduct, allProducts, getYourProducts, updateYourProduct } from "./Controllers/Product-controller.js";
import { checkSeller } from "./Middlewares/Seller.Middleware.js";


const app = express();
dotenv.config();
app.use(express.json())

app.get("/", function(req,res){
    res.send("Working")
})

app.post("/register",register)

app.post("/login",login)

app.post("/get-current-user",getCurrentUser)

app.post("/add-product",checkSeller, addProduct)

app.get("/all-products", allProducts)

app.get("/get-your-products",checkSeller, getYourProducts)

app.patch("/update-your-product",checkSeller, updateYourProduct)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Errpr while cooencting to MongDB",error)
})

app.listen(8000,()=>{
    console.log("Listening from sever 8000")
})