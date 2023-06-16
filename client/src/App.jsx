import React from 'react'
import Header from './component/Header'
import AllBlogsPage from './component/AllBlogsPage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './component/Login';
import Register from './component/Register';
import NotFound from './component/NotFound';
import CreateBlog from './component/CreateBlog';



function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<AllBlogsPage />} />
          <Route exact path='/create' element={<CreateBlog/>} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
