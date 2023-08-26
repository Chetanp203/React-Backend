import axios from 'axios';
import React, { useEffect, useState } from 'react'

const YourProducts = () => {
    const [allProducts, setAllProducts]=useState();
    useEffect(()=>{
        async function getProducts(){
            const token =JSON.parse(localStorage.getItem("token"));
            const response = await axios.post("http://localhost:8000/get-your-products",{token})
             if(response.data.success){
                setAllProducts(response.data.products)
             }
        }
        getProducts();
    },[])
  return (
    <div style={{width:"100%"}}>
        <h1>YourProducts</h1>
      {allProducts?.length ? <div style={{display:"flex",width:"100%",flexWrap:"wrap"}}> {allProducts.map((product)=>(
        <div key={product._id} style={{width:"15%", border:"1px solid #ccc",borderRadius:"10px",margin:"10px"}}>
            <img src={product.image} style={{width:"100%",height:"60%"}}/>
            <h3>Name: {product.name}</h3>
            <h4>Category: {product.category}</h4>
            <h2>Price: {product.price}.RS</h2>
        </div>
      )) }
      </div>
      : <div>No products found</div>}
    </div>
  )
}

export default YourProducts