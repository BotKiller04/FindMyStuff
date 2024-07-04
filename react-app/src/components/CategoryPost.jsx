import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

function CategoryPost(){
    const p = useParams()
    const[posts,setposts]=useState([]);
    useEffect(()=>{
        const data=p.CatId
        const url = 'http://localhost:4000/get-category/'+data;
        axios.post(url)
        .then((res)=>{
            if(res.data.posts){
                const reversedPosts = res.data.posts.reverse();
                setposts(reversedPosts);
            }
        })
        .catch((err)=>{console.log(err); alert("Server error")})
    },[])


    return(
        <div>
        




        <div >
            <Header/>
            <Link to='/'><button>ALL RESULTS</button></Link>
            <div className="d-flex justify-content-center flex-wrap">
            <div>{posts && posts.length>0 && <h3>Category wise results</h3>}</div><br></br>

                {posts && posts.length>0 && 
                posts.map((item,index)=>{
                    return(
                        <div className="card m-3 p-3">
                        <img src={'http://localhost:4000/'+item.image} style={{ width: '240px' }}></img> 
                        <p>Title: {item.title} | Category: {item.category}</p>
                        <p>Description: {item.desc}</p>
                        <p>Found at: {item.place}</p>
                        <p>Contact details: {item.contact}</p>
                        </div>
                    )
                })
                }
                {posts && posts.length==0 && <h4>No results for this category</h4>}
            </div>
            
        </div></div>
    )
}
export default CategoryPost;