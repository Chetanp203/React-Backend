import React, {   useEffect, useState } from 'react';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from './Context/AuthContext';
import { useContext } from 'react';

const Login = () => {
    const [userData,setUserData]= useState({ email:"", password:""})
    const {state,dispatch} = useContext(AuthContext);
    const router = useNavigate();


    const handleChange = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }
    // console.log(userData,"-userdata")

    const handleSubmit =async (event)=>{
        event.preventDefault();
        if( userData.email && userData.password ) {
              const response = await axios.post("http://localhost:8000/login",{userData});
              if(response.data.success){
                dispatch({
                  type:'LOGIN',
                  payload : response.data.user
                })
                localStorage.setItem("token",JSON.stringify(response.data.token))
                setUserData({email:"",password:""})
                router("/")
                toast.success(response.data.message)
              }else{
                toast.error(response.data.message)
              }
        }else{
            toast.error("All fields are mandatory")
        }
}

useEffect(()=>{
if(state?.user?.name){
  router("/")
}
},[state])
  return (
    <div className='reg-con'>
        <form className='form-con' onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <hr />
            <label>Email:</label><br/>
            <input type="email" placeholder='Email ID' name='email' value={userData.email} onChange={handleChange} /><br />
            <label>Password:</label><br />
            <input type="password" placeholder='Password' name='password' value={userData.password} onChange={handleChange}/><br />
            <input className='sub' type="submit"  value="Login"/>
            <span>Don't have an account?<span onClick={()=>router("/register")}><b>Register Here!!</b></span></span>
        </form>
    </div>
  )
}

export default Login