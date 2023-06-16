import React, { useState } from 'react'
import axios from 'axios'

function Register() {
  const [name,setname] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const submitHandler = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/register',{name,username,password})
      console.log(response.data)
    } catch (error) {
      console.log("User already registered")
    }
  }
  
  return (
    <main className='m'>
      <form onSubmit={submitHandler} >
        <input type="text" placeholder='Enter name' className='i' value={name}  onChange={(e)=>setname(e.target.value)}  />
        <input type="text" placeholder='Create username' className='i' value={username} onChange={(e)=>setUsername(e.target.value)}  />
        <input type="password" placeholder='Create password' className='i' value={password} onChange={(e)=>setPassword(e.target.value)}  />
        <button>Register</button>
      </form>
    </main>
  )
}

export default Register