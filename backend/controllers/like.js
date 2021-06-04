const Publication = require('../models/publications');
const User = require('../models/user');
const Like = require('../models/like');

exports.likePost = (req, res) => {
    let publicationId = parseInt(req.params.publicationId)
    if(publicationId <= 0){
        return res.status(400).json({ error: 'Paramètres invalides!' })
    }
    Like.findOne({
        where: { 
            userid: req.token.userId,
            publicationid:  publicationId
        }    
    })
    .then(likeFound => {
        if(likeFound){
            Like.destroy({
                where: {
                    userid: likeFound.userid,
                    publicationid: likeFound.publicationid
                }
            })
            .then(likeDestroyed => res.status(200).json(likeDestroyed))
            .catch(error => res.status(400).json({ error: 'Impossible de disliker cette publication !' }))
        }else{
            Like.create({
                userid: req.token.userId,
                publicationid: publicationId
            })
            .then(likeCreated => res.status(201).json(likeCreated))
            .catch(error => res.status(401).json({ error: 'Impossible de liker cette publication !' }))
        }
    })
    .catch(error => res.status(500).json(error))
}