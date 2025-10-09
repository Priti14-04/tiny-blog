import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Routes ,Route} from 'react-router'
import AllBlogs from './views/AllBlogs'
import NewBlog from './views/NewBlog'
import EditBlog from './views/EditBlog'
import Signup from './views/Signup'
import Login from './views/Login'


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Routes>
    <Route path="/" element={<AllBlogs/>}/>
    <Route path="/new" element={<NewBlog/>}/>
    <Route path="/edit/:id" element={<EditBlog/>}/>
    <Route path="/blog/:slug" element={<NewBlog/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>

    <Route
    path="*"
    element={<h1 className='text-center mt-4'>404 Not Found</h1>}/>
   </Routes> 

 </BrowserRouter>
)
