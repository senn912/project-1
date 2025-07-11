const express = require('express');
const { getHomePage, getLogin, getCreateUser, postCreateUser, postLoginUser, getNewsPage, getUpload, postUpload, uploadMultiFiles } = require('../controllers/homeController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('check approot: ', appRoot)
        cb(null, appRoot + "/src/public/images/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });
const upload1 = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);


//khai bao route
router.get('/', getHomePage);

router.get('/login', getLogin);
router.post('/login', postLoginUser);

router.get('/create', getCreateUser);
router.post('/create', postCreateUser);

router.get('/news', getNewsPage);
router.get('/upload', getUpload);
router.post('/upload-profile-pic', upload.single('profile_pic'), postUpload)
router.post('/upload-multiple-images', (req, res, next) => {
    upload1(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code == "LIMIT_UNEXPECTED_FILE") {
            //handle multer file limit error here
            res.send('Limit_unexpected file')
        } else if (err) {
            res.send(err)
        }

        else {
            next();
        }
    })
}, uploadMultiFiles)

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;