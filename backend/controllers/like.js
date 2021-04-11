const Publication = require('../models/publications');
const User = require('../models/user');
const Like = require('../models/like');

exports.likePost = (req, res) => {
    let publicationId = parseInt(req.params.publicationId);

    if(publicationId <= 0){
        return res.status(400).json({ error: 'Paramètres invalides!' })
    }
    Like.findOne({
        where: { 
            userId: req.userId,
            publicationId:  publicationId
        }    
    })
    .then(likeFound => {
        if(likeFound){
            Like.destroy({
                where: {
                    userId: likeFound.userId,
                    publicationId: likeFound.publicationId
                }
            })
            .then(likeDestroyed => res.status(200).json({ message: 'Vous n\'aimez plus cette publication !' }))
            .catch(error => res.status(400).json({ error: 'Impossible de disliker cette publication !' }))
        }else{
            Like.create({
                userId: req.userId,
                publicationId: publicationId
            })
            .then(likeCreated => res.status(201).json({ message: 'Vous aimez cette publication !' }))
            .catch(error => res.status(401).json({ error: 'Impossible de liker cette publicstion !' }))
        }
    })
    .catch(error => res.status(500).json(error))
}