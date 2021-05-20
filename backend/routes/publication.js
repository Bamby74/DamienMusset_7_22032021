const express = require('express');
const router = express.Router();

const auth = require('../utils/jwt');
const multer = require('../middleware/multer-config')
const publicationCtrl = require('../controllers/publication');

router.get('/', auth, publicationCtrl.getPublication);
router.get('/comments/:publicationId', auth, publicationCtrl.getOnePublication);
router.post('/', auth, multer, publicationCtrl.createPublication);


module.exports = router ;