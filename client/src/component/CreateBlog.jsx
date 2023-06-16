import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

function CreateBlog(props) {
    const [content,setContent] = useState("")
    const [heading,setHeading] = useState("")
    const navigate = useNavigate()

    const submitHandler = async (e) =>{
      e.preventDefault()
       await axios.post('http://localhost:4000/post',{
        content,
        heading
      })
      navigate('/')
    }


  return (
    <React.Fragment>
        <form className="main-container" onSubmit={submitHandler}>
            <input type="text" placeholder='Enter Title' onChange={(e)=>setHeading(e.target.value)} className='title'/>
            <textarea placeholder='enter content' spellCheck="false"  rows="6" cols="69"  onChange={(e)=>setContent(e.target.value)} className='textArea'></textarea>
            <button onClick={submitHandler} className='post-btn'>Post</button>
        </form>
    </React.Fragment>
  )
}

export default CreateBlog