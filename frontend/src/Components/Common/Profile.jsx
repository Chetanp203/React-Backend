import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { set } from "mongoose";
import AuthProtected from "./AuthProtected";
import { toast } from "react-hot-toast";
import api from "../ApiConfig";

const Profile = () => {
  const [number, setNumber] = useState();
  const [otp, setOtp] = useState();
  const [isNumberVerified, setIsNumberVerified] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { state } = useContext(AuthContext);

  const sendOtp = async () => {
    const response = await api.post("/all/send-otp", {
      userId: state?.user?._id,
    });
    if (response.data.success) {
      setIsOtpSent(true);
      toast.success(
        "OTP has been sent to your registered number please verify"
      );
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp) {
      try {
        const response = await api.post("/all/verify-otp", {
          userId: state?.user?._id,
          otp,
        });
        if (response.data.success) {
          setIsOtpSent(false);
          setIsNumberVerified(response.data.isNumberVerified);
          toast.success("OTP verification successful");
        } else {
          toast.error(response.data.message);
          setIsNumberVerified(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("enter otp");
    }
  };

  useEffect(() => {
    async function getNumber() {
      try {
        const response = await api.post("/all/get-number", {
          userId: state?.user?._id,
        });
        if (response.data.success) {
          setNumber(response.data.number);
          setIsNumberVerified(response.data.isNumberVerified);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (state?.user?._id) {
      getNumber();
    }
  }, [state]);
  return (
    <AuthProtected>
      <div style={{ margin: "auto", width: "30%",textAlign:"center" ,border:"1px solid #ccc",marginTop:"10%"}}>
        <h1>Your Profile</h1>
        <h2 style={{color:'orange'}}>Phone Number Verification</h2>
        <h3 style={{color:'blue'}}>Your number-{number}</h3>
        {isNumberVerified ? (
          <h3 style={{color:'green'}}>Your number is verified !!</h3>
        ) : (
          <button onClick={sendOtp}>Verify your number</button>
        )}
        {isOtpSent && (
          <div>
            <input
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Type your OTP"
            />
            <button onClick={verifyOtp}>Submit Otp</button>
          </div>
        )}
      </div>
    </AuthProtected>
  );
};

export default Profile;
