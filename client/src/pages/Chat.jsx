import React, { useState, useEffect } from "react";
import { connectWebSocket, sendPrivateMessage } from '../services/webSocketService';
import { useSelector } from 'react-redux';
import { Container, Row, Col, InputGroup, FormControl, Button, Card, ListGroup } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('Redux state after page reload:', user.username);
  }, [user]);

  useEffect(() => {
    if (user) {
      setUsername(user.username); // Automatically set username from Redux user
      console.log(user.username);
    }
  }, [user]); // This runs whenever the `user` from Redux changes

  useEffect(() => {
    if (username && !connected) {
      connectWebSocket(username, (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      setConnected(true);
    }
  }, [username, connected]);

  const handleSend = () => {
    if (receiver && message) {
      sendPrivateMessage(receiver, message);
      setMessage("");
    }
  };

  return (
    <div>
      {/* Navbar Component */}
      <NavbarComponent />

      <Container className="d-flex flex-column justify-content-center align-items-center my-5" style={{ maxWidth: "600px" }}>
        <Card className="w-100">
          <Card.Body>
            <h2 className="text-center mb-4">Chat Pannel</h2>

            {!connected ? (
              <div>
                <InputGroup className="mb-3">
                  <FormControl
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <Button variant="primary" block onClick={() => setConnected(true)}>Join Chat</Button>
              </div>
            ) : (
              <div>
                {/* // <h3 className="text-center">Welcome, {user}!</h3> */}

                {/* Receiver Input */}
                <InputGroup className="mb-3">
                  <FormControl
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="Receiver username"
                    aria-label="Receiver username"
                  />
                </InputGroup>

                {/* Message Input */}
                <InputGroup className="mb-3">
                  <FormControl
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    aria-label="Private message"
                  />
                </InputGroup>

                <Button  variant="primary" block onClick={handleSend}>Send</Button>

                {/* Messages */}
                <Card className="mt-4">
                  <Card.Body>
                    <h5>Your Messages</h5>
                    <ListGroup>
                      {messages.map((msg, index) => (
                        <ListGroup.Item key={index}>
                          {msg}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Footer Component */}
      <FooterComponent />
    </div>
  );
};

export default Chat;