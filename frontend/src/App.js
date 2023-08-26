import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { useContext } from 'react';
import { AuthContext } from './Components/Context/AuthContext';
import Navbar from './Components/Common/Navbar';
import AddProducts from './Components/Seller/AddProducts';
import YourProducts from './Components/Seller/YourProducts';

function App() {
  const {state}= useContext(AuthContext);
  console.log(state?.user,"user here")
  return (
    <>
    <Navbar/>
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/add-product' element={<AddProducts/>}/>
    <Route exact path='/your-products' element={<YourProducts/>}/>
    </Routes>
    </>
  );
}

export default App;
