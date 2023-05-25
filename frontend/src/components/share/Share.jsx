import React from 'react'
import './share.css';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';

export default function Share({ changeState }) {
    return (
        <div className='share' >
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImage' src={"https://media.tenor.com/Oq2gqzGZcJYAAAAS/rei-chiquita.gif"} alt="" />
                    <div className="shareInputCont"></div>
                    <input placeholder="What's on your mind?" onClick={changeState} className='shareInput' />
                </div>
                <hr className='shareHr' />
                <div className="shareButtom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <VideoCameraBackIcon htmlColor='red' className='shareIcon' />
                            <span className="shareOptionLongText">
                                Live video
                            </span>
                            <span className="shareOptionText">
                                Live
                            </span>
                        </div>
                        <div className="shareOption">
                            <PermMediaIcon htmlColor='green' className='shareIcon' />
                            <span className="shareOptionLongText">
                                Photo/video
                            </span>
                            <span className="shareOptionText">
                                Gallery
                            </span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor='orange' className='shareIcon' />
                            <span className="shareOptionLongText">
                                Feeling/Activity
                            </span>
                            <span className="shareOptionText">
                                Feel
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
