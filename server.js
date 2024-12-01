const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./mongoDb/db');  
const path = require('path');
 
dotenv.config();
connectDB();

const app = express();
 
app.use(cors());
app.use(express.json());


app.use('/chat-app/auth', require("./routes/userRoutes"));

app.use('/chat-app/conversation', require("./routes/conversationRoutes"));

app.use('/chat-app/conversation', require("./routes/conversationRoutes"));

app.use('/chat-app/navbar-info', require("./routes/userprofileRoutes"));


app.use('/chat-app/user/conversation', require("./routes/conversationRoutes"));
app.use('/chat-app/conversations/messages', require("./routes/messageRoutes"));
 
 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
