import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


function MyPosts() {

    const navigate = useNavigate()

    const handleRemove=(pId)=>{
        const ID = pId.pId;
        const url='http://localhost:4000/delete-post';
        const data={ID};
        axios.post(url,data)
            .then((res)=>{
                console.log(res)
                if(res.data.message){
                    window.location.reload();
                    alert(res.data.message);

                }
            })
            .catch((err)=>
                {console.log(err)
                alert('SERVER ERRrrOR')
            })
    }

    const[posts,setposts]=useState([]);
    useEffect(()=>{
        const data = {'userid':localStorage.getItem('userID')};
        const url = 'http://localhost:4000/my-posts';
        axios.post(url,data)
        .then((res)=>{
            if(res.data.posts){
                const reversedPosts = res.data.posts.reverse();
                setposts(reversedPosts);
            }
        })
        .catch((err)=>{console.log(err); alert("Server error")})
    },[])




    return (
        <div>
        <Header/>

        <div className="d-flex justify-content-center flex-wrap">
        <div>{posts && posts.length>0 && <h4>YOUR POSTS:</h4>}</div><br></br>

            {posts && posts.length>0 && 
            posts.map((item,index)=>{
                const pId=item._id;
                return(
                    <div className="card m-3 p-3">
                    <img src={'http://localhost:4000/'+item.image} style={{ width: '240px' }}></img> 
                    <p>Title: {item.title} | Category: {item.category}</p>
                    <p>Description: {item.desc}</p>
                    <p>Found at: {item.place}</p>
                    <p>Contact details: {item.contact}</p>
                    <p><button onClick={()=>handleRemove({pId})}>REMOVE</button></p>
                    </div>
                )
            })
            }
            {posts && posts.length==0 && <h4>YOU HAVE NO ACTIVE POSTS</h4>}
        </div>
        
    </div>
    )
}

export default MyPosts;