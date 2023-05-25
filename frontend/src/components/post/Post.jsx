// import React,{useEffect, useState} from 'react'
import { useState } from 'react';
import './post.css'
import LikeIcon from "../../assets/thumbs-up-regular.svg"
import Heart from "../../assets/heart-solid.svg"

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = () => {
    if (isLiked === false) {
      setLike(like + 1)
      setIsLiked(true)
    } else {
      setLike(like - 1)
      setIsLiked(false)
    }
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className='postProfileImage' src={"https://media.tenor.com/Oq2gqzGZcJYAAAAS/rei-chiquita.gif"} alt="" />
            <span className="postUsername">Nombre de usuario</span>
            <span className="postDate">{post.date}</span>
          </div>

          <div className="postTopRight">
            {/* <MoreVertIcon style={{ cursor: 'pointer' }} /> */}
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className='postImage' src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <div style={{ display: 'flex' }}>
              <div className="likeIconCont">
                <img className='likeIcon' onClick={likeHandler} src={LikeIcon} alt="" />
              </div>
              <div className="likeIconCont">
                <img className='likeIcon' onClick={likeHandler} src={Heart} alt="" />
              </div>
            </div>
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>

    </div>
  )
}
