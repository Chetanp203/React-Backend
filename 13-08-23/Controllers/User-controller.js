import UserModal from "../Modal/User-modal.js";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";


export const register= async (req,res) =>{
    
    try{
        const {userData}=req.body
        const {name, email, password,role}= userData;
        if (!name || !email || !password || !role) return res.json({success:false ,message:"All fields are mandatory.."})

        const ifEmailExist = await UserModal.find({email:email})
        if (ifEmailExist.length){
            return res.json({success:false ,message:"Email already exists try a different email..."})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new UserModal({name , email , password: hashedPassword, role});

        await user.save();

        return res.json({success:true,message:"User Registered Succefully..."})



    }catch(error){
        return res.send({success: false,message: error})
    }
}

export const login = async(req,res)=>{
    try{
        const {userData}=req.body
        const{email, password}= userData;
        if (!email || !password) return res.json({success:false ,message:"All fields are mandatory.."})

        const user = await UserModal.findOne({email})
        if (!user) return res.json({success:false ,message:"User not found"})

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect){
            const userCreds = {
                name: user.name,
                email: user.email,
                _id : user._id
            }
            const token = jwt.sign({ userID: user._id}, process.env.JWT_SECRET)

            return res.json({success:true ,message:"Login Successfull",user: userCreds,token:token})

        }
        return res.json({success:false ,message:"Password is incorrect"})

    }catch(error){
        return res.json({success:false ,message:error})
    }
}

export const getCurrentUser =async (req,res) =>{
    try{
        const {token} = req.body;
        if(!token) return res.status(404).json({success:false,message:"Token is reqired"})

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
         
        if(!decodedData){
            return res.status(404).json({success:false,message:"Not a valid json token"})
        }
        // return res.send(decodedData)

        const userId =decodedData?.userID

        const user = await UserModal.findById(userId);

        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        const userObject = {
            name : user?.name,
            email : user?.email,
            _id: user?._id
        }

        return res.status(200).json({success:true,user : userObject})

    }catch(error){
        return res.status(500).json({success:false, message:error})
    }
}