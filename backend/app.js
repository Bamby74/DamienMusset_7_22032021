const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const path = require('path');
const helmet = require('helmet')

const publicationRoutes = require('./routes/publication');
const userRoutes = require('./routes/user');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');
=======

//const userRoutes = require('.routes/user');
const publicationRoutes = require('./routes/publication');
const userRoutes = require('./routes/user');
const likeRoutes = require('./routes/like');
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)


const app = express();

<<<<<<< HEAD
=======

//app.use('./api/auth', userRoutes);

>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.urlencoded())
app.use(express.json());
<<<<<<< HEAD
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/publications', publicationRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comments', commentRoutes);
=======

app.use('/api/publications', publicationRoutes);
app.use('/api/auth', userRoutes);
//app.use('/api/', likeRoutes);
app.use('/api/like', likeRoutes)
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)

module.exports = app;