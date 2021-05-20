const Publication = require('../models/publications');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
const User = require('../models/user');
const { QueryTypes } = require('sequelize');

exports.getPublication = (req, res, next) => {
    let fields = req.query.fields;
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);
    let order = req.query.order;

    db.query("SELECT  p.*, users.username, c, countcoments FROM publications AS p LEFT JOIN users ON users.id = p.user_id LEFT JOIN (SELECT likes.publicationid, COUNT (userid) AS c FROM likes GROUP BY publicationid) AS likecount on publicationid = p.id LEFT JOIN (SELECT coments.publication_id, COUNT (user_id) AS countcoments FROM coments GROUP BY publication_id) AS comentscount ON publication_id = p.id", { type: QueryTypes.SELECT,raw: true, logging: console.log })
    .then(publications => {
        if(publications){
            res.status(200).json(publications)
        }else{
            res.status(404).json({ error: 'Aucune message trouvée !'})
        }
    })
    .catch(error => res.status(500).json({ error }))
};

exports.getOnePublication = (req, res, next) => {
    let publicationId = req.params.publicationId
    db.query(`SELECT publications.*, users.username FROM publications,users WHERE publications.id = ${publicationId}  AND publications.user_id = users.id `)
    .then(publication => {
        res.status(200).json(publication)
    })
    .catch(error => console.log(error))
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
    .catch(error => 
        res.status(500).json({ error: error })
        )
};
