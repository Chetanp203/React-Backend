import express from "express";
import { login, register } from "./Controllers/User.controllers.js";
import mongoose from "mongoose";

const app = express();

app.get("/",function(req,res){
 res.send("welcome to backend")

})
app.get("/login",login)

app.get("/register",register)

mongoose.connect("mongodb+srv://chetan203:chetan203@cluster0.qocfrn6.mongodb.net/REACT-BACKEND").then(()=>{
    console.log("connected to mongoDB")
}).catch((error)=>{
    console.log("Error while connecting to mongoDB",error)
})

app.listen(8000,() =>{
    console.log("server listening on port 8000");
})