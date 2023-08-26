import React, {useContext, useEffect, useState } from 'react';
import "./../Register.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import SellerProtected from '../Common/SellerProtected';



const AddProducts = () => {
    const [productData,setProductData]= useState({name:"", price:"", image:"",category:""})
    const {state,dispatch} = useContext(AuthContext);
    const router = useNavigate();

    const handleChange = (event)=>{
        setProductData({...productData,[event.target.name]:event.target.value})
    }


    const handleSubmit =async (event)=>{
        event.preventDefault();
        if(productData.name && productData.price && productData.image && productData.category){
              const token = JSON.parse(localStorage.getItem("token"))
              try{
                const response = await axios.post("http://localhost:8000/add-product",{token,productData});
                if(response.data.success){
                  setProductData({name:"", price:"", image:"",category:""})
                  router("/your-products")
                  toast.success(response.data.message)
                }
              }catch(error){

                  toast.error(error.response.data.message)
              }
        }else{
            toast.error("All fields are mandatory")
        }
    }

    // useEffect(()=>{
    //   if(state?.user?.name){
    //     router("/")
    //   }
    //   },[state])
  return (
    <SellerProtected className='reg-con'>
        <form className='form-con' onSubmit={handleSubmit}>
            <h1>Add Product</h1>
            <hr />
            <label>Name:</label><br />
            <input type="text" placeholder='Product name' name='name' onChange={handleChange} value={productData.name} /><br />
            <label>Price:</label><br />
            <input type="number" placeholder='Enter amount' name='price' onChange={handleChange} value={productData.price} /><br />
            <label >Select Category</label><br />
            {/* <select onChange={handleChange}>
                <option value="">Choose Category</option>
                <option value="Mens">Mens</option>
                <option value="Womens">Womens</option>
                <option value="Kids">Kids</option>
            </select><br /> */}
            <input type="text" placeholder='Category' name='category' onChange={handleChange} value={productData.category} /><br />
            <label>Image :</label><br />
            <input type="text" placeholder='Insert Image' name='image' onChange={handleChange} value={productData.image}/><br />
            <input className='sub' type="submit" value="Add product"/>
        {/* <button onClick={()=>router('/your-products')}>Your Products</button> */}
        </form>
    </SellerProtected>
  )
}

export default AddProducts