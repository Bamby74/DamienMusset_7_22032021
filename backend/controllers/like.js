const Publication = require('../models/publications');
const User = require('../models/user');
const Like = require('../models/like');

exports.likePost = (req, res) => {
<<<<<<< HEAD
    let publicationId = parseInt(req.params.publicationId)
=======
    let publicationId = parseInt(req.params.publicationId);

>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
    if(publicationId <= 0){
        return res.status(400).json({ error: 'Paramètres invalides!' })
    }
    Like.findOne({
        where: { 
<<<<<<< HEAD
            userid: req.token.userId,
            publicationid:  publicationId
=======
            userId: req.userId,
            publicationId:  publicationId
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
        }    
    })
    .then(likeFound => {
        if(likeFound){
            Like.destroy({
                where: {
<<<<<<< HEAD
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
=======
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
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
        }
    })
    .catch(error => res.status(500).json(error))
}