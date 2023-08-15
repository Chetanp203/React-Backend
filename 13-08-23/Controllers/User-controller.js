import UserModal from "../Modal/User-modal.js";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";


export const register= async (req,res) =>{
    
    try{
        const {name, email, password,role}= req.body;
        if (!name || !email || !password || !role) return res.json({status:"error",message:"All fields are mandatory.."})

        const ifEmailExist = await UserModal.find({email:email})
        if (ifEmailExist.length){
            return res.json({status:"error",message:"Email already exists try a different email..."})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new UserModal({name , email , password: hashedPassword, role});

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

export const getCurrentUser =async (req,res) =>{
    try{
        const {token} = req.body;
        if(!token) return res.status(404).json({status:"error",message:"Token is reqired"})

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
         
        if(!decodedData){
            return res.status(404).json({status:"error",message:"Not a valid json token"})
        }
        // return res.send(decodedData)

        const userId =decodedData?.userID

        const user = await UserModal.findById(userId);

        if(!user){
            return res.status(404).json({status:"error",message:"User not found"})
        }
        const userObject = {
            name : user?.name,
            email : user?.email,
            _id: user?._id
        }

        return res.status(200).json({status:"success",user : userObject})

    }catch(error){
        return res.status(500).json({status: error, message:error})
    }
}