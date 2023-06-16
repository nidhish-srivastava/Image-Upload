import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    
   

  return (
    <React.Fragment>
    <nav>
        <ul>

            <li><Link to=""> 
                MYBLOG
            </Link>
            </li>
            <li><Link to="/">
                Home
            </Link>
                </li>
            <li><Link to="/login">
                Login
            </Link>
                </li>
            <li>
                <Link to="/register">
                Register
                </Link>
                </li>
        </ul>
    </nav>
    </React.Fragment>
  )
}

export default Header