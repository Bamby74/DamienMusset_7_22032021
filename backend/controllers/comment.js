const Publication = require('../models/publications');
const User = require('../models/user');
const Like = require('../models/like');
const db = require('../config/db.config');
const Comment = require('../models/comment');

exports.getComments = (req, res, next) => {
    let publicationId = parseInt(req.params.publicationId)
    db.query(`SELECT coments.*, users.username FROM coments LEFT JOIN users ON coments.user_id = users.id WHERE coments.publication_id = ${publicationId}`)
    .then(comments => {
        if(comments.length > 0) {
            res.status(200).json(comments)
        }else{
            res.status(404).json({ message: "Aucun commentaire pour cette publication !"})
        }
    })
    .catch(error => res.status(500).json({ error: error }))
};

exports.createComment = (req, res, next) => {
    let content = req.body.content
    let publication_id = req.body.publicationId
    
    Comment.create({
        content: content,
        publication_id: publication_id,
        user_id : req.token.userId
    })
    .then(createdComment => res.status(201).json(createdComment))
    .catch(error => res.status(404).json({ error: error}))
}

exports.deleteComment = (req, res, next) => {
    User.findOne({
        where: { id: req.token.userId}
    }).then(userFound => {
        if(userFound.isAdmin == true){
            Comment.destroy({
                where: { id: req.params.commentId}
            }).then(deletedComment => {
                res.status(200).json({deletedComment})
            }).catch(error => res.status(500).json({ error: error}))
        }
    }).catch(error => res.status(401).json({ error: error}))
}

    