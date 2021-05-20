const express = require('express');
const router = express.Router();

const auth = require('../utils/jwt');
const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil', auth, userCtrl.getUserProfil);
router.put('/profil', auth, userCtrl.updateUserProfil);
router.delete('/profil', auth, userCtrl.deleteUserProfil);

module.exports = router;