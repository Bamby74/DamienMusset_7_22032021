const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, '095883nedfnejcnjdw94584o2dmenx39r2');
        next();
    }catch {
        res.status(401).json({ error: new Error('Requête non authentifiée')});
    }
}

