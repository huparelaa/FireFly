import react from 'react'
import { Chat } from "./Chat"
import MessageList from './MessageList'

function ChatApp(){
    return (
        <div> 
            <Chat/>
            <MessageList/>
        </div>
    )
}

export { ChatApp }