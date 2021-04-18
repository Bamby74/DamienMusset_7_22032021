const express = require('express');
const bodyParser = require('body-parser');

//const userRoutes = require('.routes/user');
const publicationRoutes = require('./routes/publication');
const userRoutes = require('./routes/user');
const likeRoutes = require('./routes/like');


const app = express();

//app.use('./api/auth', userRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.urlencoded())
app.use(express.json());

app.use('/api/publications', publicationRoutes);
app.use('/api/auth', userRoutes);
//app.use('/api/', likeRoutes);
app.use('/api/like', likeRoutes)

module.exports = app;