// import React,{useEffect, useState} from 'react'
import './post.css'

export default function PostText({ title, description }) {

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postCenter">
          <h2 className="postTitle"><b>{title}</b></h2>
          <span className="postText">{description}</span>
        </div>
      </div>
    </div>
  )
}
