import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const initialState = {user : null}

export const AuthContext = createContext();

const reducer = (state,action)=>{
    switch(action.type){
        case'LOGIN':
        return{...state, user: action.payload}
        case'LOGOUT':
        return{...state, user: null}
        default:
            return state
    }
}

const AuthProvider =({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState)

    useEffect(()=>{
      async  function getCurrentUserData(){
          let token = JSON.parse(localStorage.getItem("Token"));
          const response = await axios.post("http://localhost:8000/get-current-user",{token});
          if(response.data.success){
            dispatch({
                type: "LOGIN",
                payload: response.data.user
            })
          }else{
            dispatch({
                type:"LOGOUT",
            });
          }
        }
        getCurrentUserData();
    },[])

    return(
        <AuthContext.Provider value={{state,dispatch}}>
         {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;