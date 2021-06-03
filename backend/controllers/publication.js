const Publication = require('../models/publications');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
const User = require('../models/user');
const { QueryTypes } = require('sequelize');
const Like = require('../models/like');

exports.getPublication = (req, res, next) => {
    db.query(`SELECT  p.*, users.username, c, countcoments FROM publications AS p 
                LEFT JOIN users ON users.id = p.user_id 
                LEFT JOIN (SELECT likes.publicationid, COUNT (userid) AS c FROM likes GROUP BY publicationid) 
                    AS likecount on publicationid = p.id 
                LEFT JOIN (SELECT coments.publication_id, COUNT (user_id) AS countcoments FROM coments GROUP BY publication_id)
                    AS comentscount ON publication_id = p.id`, 
        { type: QueryTypes.SELECT,raw: true, logging: console.log })
    .then(publications => {
        res.status(200).json(publications)
    })
    .catch(error => res.status(500).json({ error }))
};

exports.getOnePublication = (req, res, next) => {
    User.findOne({
        where: { id: req.token.userId}
    }).then(user => {
        if(user) {
            let publicationId = req.params.publicationId
            db.query(`SELECT publications.*, users.username, c, countcoments FROM publications,users 
                        LEFT JOIN (SELECT likes.publicationid, COUNT(userid) AS c FROM likes GROUP BY publicationid)
                            AS likecount ON publicationid = ${publicationId} 
                        LEFT JOIN (SELECT coments.publication_id, COUNT (user_id) AS countcoments FROM coments GROUP BY publication_id)
                            AS comentscount ON publication_id = ${publicationId} 
                        WHERE publications.id = ${publicationId} AND publications.user_id = users.id `)
            .then(publication => {
                res.status(200).json(publication)
            })
            .catch(error => console.log(error))
        }
    }).catch(error => res.status(500).json({ error: "Vous n'êtes pas autorisés à accéer à ces informations"}))
};

exports.createPublication = (req, res, next) => {
    let publication = JSON.parse(req.body.publication)
    let image = "";
    if(req.file){
         image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }  
    User.findOne({
        where: { id: req.token.userId}
    })
    .then(userFound => {
        if(userFound){
            Publication.create({
                ...publication,
                user_id: req.token.userId,
                attachment: image
            })
            .then(newPublication => {
                res.status(201).json(newPublication)})
            .catch(error => 
                res.status(500).json({ error: error })
            )
        }
        else{
            res.status(404).json({ error: 'Utilisateur introuvable !'})
        }
    })
    .catch(error => res.status(500).json({ error: error }))
};

exports.deletePublication = (req, res) => {
    User.findOne({
        where: { id: req.token.userId}
    }).then( userFound => {
        if(userFound.isAdmin == true){
            Publication.destroy({
                where: { id: req.params.publicationId}
            }).then(deletedPublication => {
                res.status(200).json({deletedPublication})
            }).catch(error => res.status(500).json({ error: error}))
        }
    }).catch(error => res.status(401).json({ error: error}))
}
