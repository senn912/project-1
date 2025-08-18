const express = require('express');
const { getHomePage, getLogin, getCreateUser, postCreateUser, postLoginUser, getNewsPage, getUpload, postUpload, uploadMultiFiles, getManagement, getUpdatePage, postUpdateUser, getDeletePage, postDeleteUser, checkJWT } = require('../controllers/homeController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const { upload, upload1 } = require('../middleware/upload');

var appRoot = require('app-root-path');
const authMiddleware = require('../middleware/authMiddleware');
const checkAcc = require('../middleware/checkAcc');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/check-token', checkJWT);

router.get('/', checkAcc, getHomePage);

router.get('/login', getLogin);
router.post('/login', postLoginUser);

router.get('/create', getCreateUser);
router.post('/create', postCreateUser);

router.get('/news', checkAcc, getNewsPage);

router.get('/management', authMiddleware, adminMiddleware, getManagement);

router.get('/upload', authMiddleware, getUpload);
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
    res.clearCookie('token');
    res.redirect('/');
});

router.get('/update/:id',authMiddleware, adminMiddleware, getUpdatePage);
router.post('/update-user',  postUpdateUser);

router.get('/delete/:id', adminMiddleware, getDeletePage);
router.post('/delete-user', adminMiddleware, postDeleteUser);

module.exports = router;