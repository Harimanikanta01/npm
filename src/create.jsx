import React from "react";
import { useState } from "react";
function Np(){
    const [new1,setNew1]=useState({
        name:"",
        pass:""
    })
const submit1=(e)=>{
    setNew1({...new1,[e.target.name]:e.target.value})
}
const submit=(e)=>{
e.preventDefault()
console.log(new1.name,new1.pass)
}

    return(
        <div>
            <input type="text"name="name"onChange={submit1} value={new1.name}></input>
            <input type="text"name="pass"onChange={submit1}value={new1.pass}></input>
            <button onClick={submit}className="btn btn-danger">create Account</button>
        </div>
    )
}
export default Np