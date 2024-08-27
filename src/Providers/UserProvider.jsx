import React from 'react'
import axios from "axios";
import { userContext } from "../contexts"; 

import {  useEffect,useState} from 'react'
import Loading from '../components/Loading';

function UserProvider({children}) {
  let [user,setUser] = useState(); 
  let [loading,setLoading] =useState(true);
  useEffect(()=>{
    let token=localStorage.getItem('token');
    if(token){
      axios.get("https://myeasykart.codeyogi.io/me",{
        headers:{
          Authorization:token,
        }
      }).then((response)=>{
        setUser(response.data);
        setLoading(false);
      }).catch(()=>{
        setLoading(false);
      })
    }
    else{
      setLoading(false);
    }
  },[])
  
  if(loading)return <Loading/>
  
  return(
    <userContext.Provider value={{isLoggedIn: !!localStorage.getItem('token'),user,setUser}}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider