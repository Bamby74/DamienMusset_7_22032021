const jwt = require('jsonwebtoken');
<<<<<<< HEAD
require('dotenv').config();
=======
<<<<<<< HEAD
require('dotenv').config();
=======
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
>>>>>>> master

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
<<<<<<< HEAD
        req.token = jwt.verify(token, process.env.TOKEN_KEY);
        next();
=======
<<<<<<< HEAD
        req.token = jwt.verify(token, process.env.TOKEN_KEY);
        next();
=======
        const decodedToken = jwt.verify(token, '095883nedfnejcnjdw94584o2dmenx39r2');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        }else{
            req.userId = userId;
            next();
        }
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
>>>>>>> master
    }catch {
        res.status(401).json({ error: new Error('Requête non authentifiée')});
    }
}

