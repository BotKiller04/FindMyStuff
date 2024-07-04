import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import Header from './Header';
import { useState } from 'react';
import axios from 'axios';

function SignUP(){
    const navigate= useNavigate()
    const[username, setusername]=useState();
    const[password, setpassword]=useState();
    const handleSubmit=()=>{
        const url='http://localhost:4000/sign-up';
        const data={username,password};
        axios.post(url,data)
            .then((res)=>{
                console.log(res)
                if(res.data.message){
                    alert(res.data.message);
                }
                navigate('/login')
            })
            .catch((err)=>
                {console.log(err)
                alert('SERVER ERROR')
            })
    }
    return(
        <div >
            <Header/>
            <span >This is SignUp page </span><br></br>
            USERNAME: <input type='text' value={username}onChange={(e)=>{setusername(e.target.value)}}/><br></br>
            PASSWORD: <input type='password' value={password}onChange={(e)=>{setpassword(e.target.value)}}></input><br></br>
            <button onClick={handleSubmit}>Sign Up</button> <Link to='/login'>LOGIN</Link>
        </div>
        
    )
}
export default SignUP;