import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Container, Typography, CircularProgress, Paper, Stack, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { FaRobot, FaUserCircle } from "react-icons/fa";
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatBoxRef = useRef(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        // Scroll chat box to the end when messages change
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);
    const sendMessage = async () => {
      if (input.trim() === '') return;
  
      const newMessage = { content: input, role: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');
      setLoading(true);
  
      try {
          const response = await axios.post('http://localhost:8000/get_response/', { message: input });
          setMessages(prevMessages => [...prevMessages, { content: response.data.response, role: 'bot' }]);
          toast.success('Message sent successfully');
      } catch (error) {
          console.error('Error:', error);
          toast.error('Error sending message');
      } finally {
          setLoading(false);
      }
  };

    return (
        <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: isMobile ? '20px' : '0',  }}>
            <Typography variant="h4" align="center" sx={{ mt:1,mb:1, fontweight: 'bold', textTransform:'uppercase' }}>Educational Chat Assistant</Typography>
            <Paper elevation={3} style={{ flex: 1, marginTop: '20px', padding: '20px', overflow: 'auto', backgroundColor: '#f3f3f3', borderRadius: '10px' }}>
                {messages.map((message, index) => (
                    <Paper elevation={3} key={index} style={{ textAlign:'left', margin: '10px 0', padding: '10px', backgroundColor: message.role === 'user' ? '#ffffff' : '#007bff', color: message.role === 'user' ? '#000000' : '#ffffff', borderRadius: '5px' }}>

                        {message.role === 'user' ?
                            <Typography variant="body1">
                                <strong > <PersonIcon style={{ height: '20px', width: '20px' }} /> :</strong> {message.content}
                            </Typography> :
                            <Typography>
                                <strong> <FaRobot style={{ height: '20px', width: '20px' }} /> :</strong>  {message.content}
                            </Typography>
                        }

                    </Paper>
                ))}
                {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
            </Paper>
            <Stack direction="row" spacing={1} sx={{mt:2,mb:1}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                />
                <Button variant="contained" style={{ backgroundColor: '#007bff', color: '#ffffff' }} endIcon={<SendIcon />} onClick={sendMessage}>
                    Send
                </Button>
            </Stack>
        </Container>
    );
};

export default Chatbot;
