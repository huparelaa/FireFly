import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageList() {
  const [messages, setMessages] = useState([]);
    
  useEffect(() => {
    async function bringMessages() {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/messages/${1}/${4}`)
        .then(response => setMessages(response.data))
        .catch(error => console.log(error));
    }
    bringMessages()
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Text</th>
          {/*<th>Sender</th>
          <th>Receiver</th>*/}
        </tr>
      </thead>
      <tbody>
        {messages.map(message => (
          <tr key={message.id}>
            <td>{message.message}</td>
            {/*<td>{message.sender}</td>
            <td>{message.receiver}</td>*/}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MessageList;
