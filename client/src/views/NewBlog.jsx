import React from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor';


function NewBlog() {

  return (
    <div>
      <h1>new</h1>
      <MarkdownEditor
      value={""}
      onChange={(value, viewUpdate) => {}}
    />

    </div>
  )
}

export default NewBlog
