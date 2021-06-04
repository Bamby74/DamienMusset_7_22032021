const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
    'video/mov': 'mov',
    'video/avi': 'avi',
    'video/wmf': 'wmf'
}
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        const filename = name + Date.now() + '.' + extension;
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('file');