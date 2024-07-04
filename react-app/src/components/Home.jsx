import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryPost from "./CategoryPost";
import categories from './categoriesList';

function Home(){
    const navigate = useNavigate();

    const handleCategory=(id)=>{
        const pid = id.id;
        navigate('/category/'+pid)
    }

    const[posts,setposts]=useState([]);
    useEffect(()=>{
        const url = 'http://localhost:4000/get-post';
        axios.get(url)
        .then((res)=>{
            if(res.data.posts){
                const reversedPosts = res.data.posts.reverse();
                setposts(reversedPosts);
            }
        })
        .catch((err)=>{console.log(err); alert("Server error")})
    },[])


    return(
        <div >
            <Header/>
            <div className = "cat-container d-flex justify-content-between">
            <div>
            <br></br><span style={{ marginRight: '8px' }}>SEARCH CATEGORY WISE:  </span>
                {categories && categories.length>0 && 
                    categories.map((item,index)=>{
                        const id=item;
                        return(
                            <span onClick={()=>handleCategory({id})} className='category' >{item}</span>
                        )
                    })}


            </div>
            
        </div>
            <div className="d-flex justify-content-center flex-wrap">

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
            </div>
            
        </div>
    )
}
export default Home;