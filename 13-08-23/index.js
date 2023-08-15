import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { getCurrentUser, login, register } from "./Controllers/User-controller.js";
import { addProduct } from "./Controllers/Product-controller.js";


const app = express();
dotenv.config();
app.use(express.json())

app.get("/", function(req,res){
    res.send("Working")
})

app.post("/register",register)

app.post("/login",login)

app.post("/get-current-user",getCurrentUser)

app.post("/add-product", addProduct)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Errpr while cooencting to MongDB",error)
})

app.listen(8000,()=>{
    console.log("Listening from sever 8000")
})