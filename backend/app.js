const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet')

const publicationRoutes = require('./routes/publication');
const userRoutes = require('./routes/user');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.urlencoded())
app.use(express.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/publications', publicationRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;