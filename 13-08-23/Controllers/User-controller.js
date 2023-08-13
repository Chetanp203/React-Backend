import UserModal from "../Modal/User-modal.js";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";


export const register= async (req,res) =>{
    
    try{
        const {name, email, password}= req.body;
        if (!name || !email || !password) return res.json({status:"error",message:"All fields are mandatory.."})

        const ifEmailExist = await UserModal.find({email:email})
        if (ifEmailExist.length){
            return res.json({status:"error",message:"Email already exists try a different email..."})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new UserModal({name , email , password: hashedPassword});

        await user.save();

        return res.json({status:"Success",message:"User Registered Succefully..."})



    }catch(error){
        return res.send({status:"error",message: error})
    }
}

export const login = async(req,res)=>{
    try{
        const{email, password}= req.body;
        if (!email || !password) return res.json({status:"error",message:"All fields are mandatory.."})

        const user = await UserModal.findOne({email})
        if (!user) return res.json({status:"error",message:"User not found"})

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect){
            const userCreds = {
                name: user.name,
                email: user.email,
                _id : user._id
            }
            const token = jwt.sign({ userID: user._id}, process.env.JWT_SECRET)

            return res.json({status:"Success",message:"Login Successfull",user: userCreds,token:token})

        }
        return res.json({status:"error",message:"Password is incorrect"})

    }catch(error){
        return res.json({status:"error",message:error})
    }
}