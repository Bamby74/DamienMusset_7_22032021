const express = require('express');
const router = express.Router();

const auth = require('../utils/jwt');
<<<<<<< HEAD
const multer = require('../middleware/multer-config')
const publicationCtrl = require('../controllers/publication');

router.get('/', auth, publicationCtrl.getPublication);
router.get('/comments/:publicationId', auth, publicationCtrl.getOnePublication);
router.post('/', auth, multer, publicationCtrl.createPublication);
router.delete('/:publicationId', auth, publicationCtrl.deletePublication);
=======
const publicationCtrl = require('../controllers/publication');

router.get('/', auth, publicationCtrl.getPublication);
router.post('/', auth, publicationCtrl.createPublication);
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)


module.exports = router ;