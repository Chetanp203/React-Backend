import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const{state,dispatch}= useContext(AuthContext);
    const router = useNavigate();
  return (
    <div style={{width:"100%",display:'flex',alignItems:"center",justifyContent:"space-around",backgroundColor:"lightgrey"}}>
        <h1 onClick={()=>router('/')}><em>Awdiz</em></h1>

        <div style={{display:'flex',width:"35%",justifyContent:"space-around"}}>
            {state?.user?.role != "Seller" && <h3>Men</h3>}
            {state?.user?.role != "Seller" && <h3>Women</h3>}
            {state?.user?.role != "Seller" && <h3>Kids</h3>}
            
            { state?.user?.role == "Seller" && <h3 onClick={()=>router('/add-product')}>Add Products</h3> }
            { state?.user?.role == "Seller" && <h3 onClick={()=>router('/your-products')}>Your Products</h3> }           
        </div>

        <div style={{display:'flex',width:"20%",justifyContent:"space-around"}}>
            {state?.user?.name ? <>
                {state?.user?.role == "Buyer" && <h4>Cart</h4>}
            <h4 onClick={()=>router('/profile')}>Profile</h4>
            <h4 onClick={()=>dispatch({type:"LOGOUT"})}>Logout</h4>
            </>: <h4 onClick={()=>router('/login')}>Login/Register</h4>}
            
            
        </div>

    </div>
  )
}

export default Navbar