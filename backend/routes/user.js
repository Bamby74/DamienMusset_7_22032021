const express = require('express');
const router = express.Router();

const auth = require('../utils/jwt');
const userCtrl = require('../controllers/user');

<<<<<<< HEAD
=======

>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil', auth, userCtrl.getUserProfil);
router.put('/profil', auth, userCtrl.updateUserProfil);
<<<<<<< HEAD
router.delete('/profil', auth, userCtrl.deleteUserProfil);
=======
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)

module.exports = router;