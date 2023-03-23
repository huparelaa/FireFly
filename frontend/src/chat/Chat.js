import React, { Component } from 'react';

class Chat extends Component {
  state = {
    text: '',
    sender: '',
    receiver: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { message, sender, receiver } = this.state;
    fetch(`${process.env.REACT_APP_API_URL}/api/messages/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "sender": sender, "receiver": receiver, "message": message })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  render() {
    const { message, sender, receiver } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Text:
          <input type="text" name="message" value={message} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Sender:
          <input type="text" name="sender" value={sender} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Receiver:
          <input type="text" name="receiver" value={receiver} onChange={this.handleChange} />
        </label>
        <br />
        <button type="submit">Send Message</button>
      </form>
    );
  }
}

export { Chat } ;
/*import React, { useState, useEffect } from 'react';
import axios from 'axios'


function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    // Realizar una petición GET al endpoint de tu vista de mensaje
    async function getMessages() {
        await axios(`/messages/?sender=${sender}&receiver=${receiver}`)
        .then(response => response.json())
        .then(data => setMessages(data));
    }
    getMessages()
  }, [sender, receiver]);

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.target);
    // Realizar una petición POST al endpoint de tu vista de mensaje
    axios('/messages/', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(data => {
        setMessages([...messages, data]);
      });
  };

  return (
    <div>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <p>{message.text}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" />
        <input type="hidden" name="sender_id" value={sender} />
        <input type="hidden" name="receiver_id" value={receiver} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export  { Chat };*/