import express from "express";

const app = express();

app.get("/",function(req,res){
 res.send("welcome to backend")

})

app.listen(8000,() =>{
    console.log("server listening on port 8000");
})