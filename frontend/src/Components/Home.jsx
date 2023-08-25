import React, { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'

const Home = () => {
  const {state}= useContext(AuthContext);
  // console.log(state?.user,"user here");
  
  return (
    <div>
      Home Username: {state?.user?.name}
    </div>
  )
}

export default Home