// import React,{useEffect, useState} from 'react'
import './post.css'

export default function PostText({ title, description }) {

  return (
    <div className="post  text-white ">
      <div className="postWrapper bg-info-home">
        <div className="postCenter">
          <h2 className="postTitle"><b>{title}</b></h2>
          <span className="postText text-lg">{description}</span>
        </div>
      </div>
    </div>
  )
}
