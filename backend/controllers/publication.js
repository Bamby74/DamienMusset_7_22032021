const Publication = require('../models/publications');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
const User = require('../models/user');

exports.getPublication = (req, res, next) => {
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;
    
    Publication.findAll({
        order: [(order != null) ? order.split(':') : ['title', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: {
            model: User,
            attributes: [ 'username' ]
        }
    })
    .then(publications => {
        if(publications){
            res.status(200).json(publications)
        }else{
            res.status(404).json({ error: 'Aucune message trouvée !'})
        }
    })
    .catch(error => res.status(500).json({ error }))
};

exports.createPublication = (req, res, next) => {
    let title = req.body.title;
    let content = req.body.content;
    
    User.findOne({
        where: { id: req.userId }
    })
    .then(userFound => {
        if(userFound){
            Publication.create({
                title: title,
                content: content,
                likes: 0,
                userId: userFound.id
            })
            .then(newPublication => res.status(201).json(newPublication))
            .catch(error => res.status(500).json({ error: 'Impossible de poster le message !'}))
        }else{
            res.status(404).json({ error: 'Utilisateur introuvable !'})
        }
    })
    .catch(error => res.status(500).json({ error: `Impossible de vérifier l\'utilisateur !`}))
};