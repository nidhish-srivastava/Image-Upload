import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function BlogCard(props) {

  // const [show, setShow] = useState(false)



  return (
    <React.Fragment>

      <div className="blog-card">
        <h3>{props.heading}</h3>
        <div className='content-para'>
          {/* {show ? props.content : `${props.content?.substring(0, 200)}...`} */}
          {/* {props.content?.substring(0,300)}... */}
          {props.content}
        </div>
        {/* <Link to={`${props.id}`}>
         Click to Read more
        </Link> */}
        {/* <button onClick={() => setShow(!show)} className='more-btn'>
          {show ? "show less" : "read More"}
        </button> */}
      </div>



    </React.Fragment>
  )
}

export default BlogCard