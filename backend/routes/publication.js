const express = require('express');
const router = express.Router();

const auth = require('../utils/jwt');
const publicationCtrl = require('../controllers/publication');

router.get('/', auth, publicationCtrl.getPublication);
router.post('/', auth, publicationCtrl.createPublication);


module.exports = router ;