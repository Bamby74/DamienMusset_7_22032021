const express = require('express');
const router = express.Router();

const auth = require('../utils/jwt');
const commentCtrl = require('../controllers/comment');

router.get('/:publicationId', commentCtrl.getComments);
router.post('/', auth, commentCtrl.createComment);

module.exports = router