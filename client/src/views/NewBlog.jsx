import React, { useState } from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { BLOG_CATEGORIES } from './../constants';


function NewBlog() {

   const[content,setContent] = useState("");
   const [title,setTitle] = useState("");
   const[category,setCategory]=useState(BLOG_CATEGORIES[0]);

  return (
    <div className='container mx-auto p-4'>
      <h1>New Blog</h1>

      <input
       type="text"  
       placeholder='Blog Title'
        className='border p2 w-full my-4'
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        />
        <select value ={category} onChange={(e) => setCategory(e.target.value)} className='border p-2 my-4'> 
          {BLOG_CATEGORIES.map((cate)=>{
            return(
              <option key={cate}  value={cate}>
                {cate}
              </option>
            );
          })}
        </select>

      <MarkdownEditor
      value={content}
      height='500px'
      onChange={(value) => {
        setContent(value);
      }}
    />
  <button className='bg-blue-500 text-white px-4 py-2 mt-4 rounded cursor-pointer'>Save Blog </button>
    </div>
  )
}

export default NewBlog
