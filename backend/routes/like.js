const express = require('express');
const router = express.Router();

const auth = require('../utils/jwt');
const likeCtrl = require('../controllers/like');

router.post('/publications/:publicationId', auth, likeCtrl.likePost);

module.exports = router;