import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const {state,logout}= useContext(AuthContext);
  // console.log(state?.user,"user here");
  const [products, setProducts] = useState([]);

  console.log(products);

  const router = useNavigate();

  useEffect(() => {
    async function allProducts() {
      try {
        const response = await axios.get("http://localhost:8000/all-products");
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log("error from catch block");
      }
    }
    allProducts();
  }, []);
  return (
    <>
    <div style={{width:"100%"}}>
      <div>
        <h1>Hello : {state?.user?.name}</h1>

        {/* {state?.user ? (
          <button onClick={() => logout()}>LOGOUT</button>
        ) : (
          <button onClick={() => router("/login")}>Login</button>
        )} */}
      </div>

      {products?.length ? (
        <div
          style={{
            display: "flex",
            marginTop: "2%",
            flexWrap: "wrap",
            gap: "40px 0",
            justifyContent:"space-around"
          }}
        >
          {products.map((product) => (
            <div  key={product._id} style={{width:"18%",border:"1px solid #ccc",margin:"10px",borderRadius:"10px",cursor:"pointer"}}>
              <div style={{width:"100%",height:"60%"}}>
                <img src={product.image} style={{width:"100%",height:"100%"}}/>
              </div>
              <h2>Name : {product.title}</h2>
              <h4>Category : {product.category}</h4>
              <h3>Price : {product.price}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>No Products</div>
      )}
    </div>
  </>
);
};

export default Home