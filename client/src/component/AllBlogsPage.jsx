import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom'
import axios from 'axios'



function AllBlogsPage(){
    
    const [data,setData] = useState()
    const getData = async () =>{
        const response = await axios.get('http://localhost:4000/post')
        console.log(response.data);
        setData(response.data)
    }

    const availableBlogs = data?.map((e, index) => (
        <BlogCard key={index}  // keeping both the ids different
            id={e._id}
            heading={e.heading}
            content={e.content}
        />
    ))

    useEffect(()=>{
        getData()
    },[])

    return (
        <React.Fragment>
            <Link to="/create" className='create-link'>
                <button className='create-btn' >Create</button>
            </Link>
            <main className='blog-main-container'>
                {availableBlogs}
            </main>

        </React.Fragment>
    )
}

export default AllBlogsPage