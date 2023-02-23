require('dotenv').config()

const express = require('express');
const cors = require('cors');

const { SERVER_PORT } = process.env;
const { login, register } = require('./controllers/auth');
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./controllers/posts');
const { isAuthenticated } = require('./middleware/isAuthenticated');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', login);
app.post('/register', register);
app.get('/posts', getAllPosts);
app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);


app.listen(SERVER_PORT, ()=> console.log(`Running on ${SERVER_PORT}`))
