import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import Header from './Header';
import { useState } from 'react';
import axios from 'axios';

function Login(){
    const navigate= useNavigate()
    const[username, setusername]=useState();
    const[password, setpassword]=useState();
    const handleSubmit=()=>{
        const url='http://localhost:4000/login';
        const data={username,password};
        axios.post(url,data)
            .then((res)=>{
                console.log(res)
                if(res.data.message){
                    alert(res.data.message);
                    if(res.data.token){
                        localStorage.setItem('token',res.data.token)
                        localStorage.setItem('userID',res.data.userID)
                        navigate('/')
                    }
                }
            })
            .catch((err)=>
                {console.log(err)
                alert('SERVER ERRrrOR')
            })
    }
    return(
        <div >
            <Header/>
            <span>This is LogIn page </span><br></br>
            USERNAME: <input type='text' value={username}onChange={(e)=>{setusername(e.target.value)}}/><br></br>
            PASSWORD: <input type='password' value={password}onChange={(e)=>{setpassword(e.target.value)}}></input><br></br>
            <button onClick={handleSubmit}>LOGIN</button> 
            <Link to='/sign-up'>SIGN UP</Link>
        </div>
        
    )
}
export default Login;