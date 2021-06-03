const express = require('express');
const router = express.Router();

const auth = require('../utils/jwt');
const likeCtrl = require('../controllers/like');

<<<<<<< HEAD
router.post('/publications/:publicationId', auth, likeCtrl.likePost);
=======
router.post('/publication/:publicationId', auth, likeCtrl.likePost);
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)

module.exports = router;