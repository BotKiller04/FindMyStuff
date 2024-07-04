import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { useState } from "react";
import axios, { Axios } from "axios";

function AddPost(){
    const navigate = useNavigate()
    const[title,settitle]=useState();
    const[desc,setdesc]=useState();
    const[place,setplace]=useState();
    const[category,setcategory]=useState('Mobiles');
    const[contact,setcontact]=useState();
    const[image,setimage]=useState();

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    },[])
    const handleSubmit=()=>{
        const formData = new FormData();
        formData.append('title',title)
        formData.append('desc',desc)
        formData.append('place',place)
        formData.append('category',category)
        formData.append('image',image)
        formData.append('contact',contact)
        formData.append('userId',localStorage.getItem('userID'))

        const url='http://localhost:4000/add-post';
        axios.post(url,formData)
            .then((res)=>{
                console.log(res)
                navigate('/')
                if(res.data.message){
                    alert(res.data.message);
                    navigate('/')
                }
            })
            .catch((err)=>
                {console.log(err)
                alert('SERVER ERROR')
            })
    }
    return(
        <div >
            <Header/>
            <h3>ADD YOUR POST HERE: </h3><br></br>
            Item Title: <input type='text' value={title} onChange={(e)=>{settitle(e.target.value)}}  /><br></br>
            Item Description: <input type='text' value={desc} onChange={(e)=>{setdesc(e.target.value)}} /><br></br>
            Where did you found it<input type='text' value={place} onChange={(e)=>{setplace(e.target.value)}} /><br></br>
            Item Category 
            <select value={category} onChange={(e)=>{setcategory(e.target.value)}} >
                <option>Mobiles</option>
                <option>Electronics</option>
                <option>Key</option>
                <option>Umbrella</option>
                <option>Wallet-Money</option>
                <option>Cloth</option>
                <option>Other</option>
            </select><br></br>
            Product Image<input type='file'onChange={(e)=>{ setimage(e.target.files[0])}} rquired/><br></br>
            Contact detail: <input type='text' value={contact} onChange={(e)=>{setcontact(e.target.value)}} /><br></br>
            <button onClick={handleSubmit}>SUBMIT</button>

            
        </div>
    )
}
export default AddPost;