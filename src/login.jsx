import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
function Lo(){
const [nh,setNh]=useState({
    "name":"",
    "pass":""
})
const [res,setRes]=useState()
const navigate=useNavigate()
       
const Po=(e)=>{
    setNh({...nh,[e.target.name]:e.target.value})
}
const submit=(e)=>{
e.preventDefault()
console.log(nh.name,nh.pass)
const cy=async()=>{
    const b=await axios.post("https://final123-z948.onrender.com/login1",nh)
    setRes(b.data)
    
    if(b.data.token){
        <Alert severity="success">This is a success Alert.</Alert>
        localStorage.setItem("token",b.data)
        navigate("/")
        }
    }
    
    cy()
    
}



return(
    <div>
        <input type="text"name="name"pass="pass"value={nh.name}onChange={Po}></input>
        <input type="text"name="pass"value={nh.pass}onChange={Po}></input>
        <button onClick={submit}>Login</button>
    </div>
)
}
export default Lo