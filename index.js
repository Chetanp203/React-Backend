import express from "express";
import { login, register } from "./Controllers/User.controllers.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import User from "./Modals/User.modal.js"

const app = express();
dotenv.config();
app.use(express.json())


app.get("/",function(req,res){
 res.send("welcome to backend...")

})
// app.get("/login",login)

// app.get("/register",register)

app.post('/login',function(req,res){
  res.send("Hello from login function")
})

app.post('/register', async function (req, res) {
  console.log(req.body, "req.body")
  const { name, surname, age, email, number, password, confirmPassword } = req.body;
  if (!name) return res.send("Name is missing..");
  if (!surname) return res.send("Surname is missing..")
  if (!age) return res.send("Age is missing..")
  if (!email) return res.send("Email is required.")
  if (!number) return res.send("Number is required");
  if (!password) return res.send("Password is required");
  if (!confirmPassword) return res.send("Confirm password is required!")
  if (password !== confirmPassword) return res.send("Password and Confirm password not matched.")

  console.log(typeof (age), typeof (number), "data types")

  const user = new User({
      name: name,
      surname: surname,
      age: age,
      email,
      number: number,
      password: password,
      confirmPassword: confirmPassword,
  })

  await user.save()
  res.send("Registeration Done..")

})


app.get("/find", async (req,res) =>{
  const {email} = req.body;
  if (!email) return res.send("Email is required")

  const user = await User.find({ email : email }).select("-password -confirmPassword ")
  console.log(user ,"list of users")
  if(user.length){
    return res.send(user[0])
  }
  return res.send("User Not Found")
})


app.patch("/update/:id", async (req,res) =>{
  const{age, number} = req.body;
  const {id}= req.params

  if(!id) return res.send("Id required")
  if(!age) return res.send("age required")
  if(!number) return res.send("number required")

  const updatedUser = await User.findByIdAndUpdate(id, {age, number}, {new: true}).select("-password")

  return res.json({message:"Data updated", data: updatedUser})
})


app.delete("/delete", async (req,res) =>{
  const{id} = req.query;
  if (!id) return res.send("Id is required")

  const deltedUser = await User.findByIdAndDelete(id)
  return res.json({message:"User Deleted", data: deltedUser})
})


mongoose.connect("mongodb+srv://chetan203:chetan203@cluster0.qocfrn6.mongodb.net/REACT-BACKEND").then(()=>{
    console.log("connected to mongoDB")
}).catch((error)=>{
    console.log("Error while connecting to mongoDB",error)
})

app.listen(8000,() =>{
    console.log("server listening on port 8000");
})