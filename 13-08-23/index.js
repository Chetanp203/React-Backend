import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { login, register } from "./Controllers/User-controller.js";


const app = express();
dotenv.config();
app.use(express.json())

app.get("/", function(req,res){
    res.send("Working")
})

app.post("/register",register)

app.post("/login",login)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Errpr while cooencting to MongDB",error)
})

app.listen(8000,()=>{
    console.log("Listening from sever 8000")
})