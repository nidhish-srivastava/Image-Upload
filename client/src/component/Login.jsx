import React, { useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Login() {
    
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const baseUrl = "http://localhost:4000"


  const submitHandler = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.post(`${baseUrl}/login`,{username,password})
       console.log(response.data)
    } catch (error) {
      console.log("Invalid")
    }
  }

  return (
    <main className='m'>
    <form onSubmit={submitHandler}>
      <input type="text" placeholder='enter username' className='i' value={username} onChange={(e)=>setUsername(e.target.value)} />
      <input type="password" placeholder='enter password' className='i' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button type='submit'>Login</button>
    <span>New user?? <Link to='/register'>Create an Account</Link>
    </span>
    </form>

  
  </main>
  )
}

export default Login