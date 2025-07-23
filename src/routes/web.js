const express = require('express');
const { getHomePage, getLogin, getCreateUser, postCreateUser, postLoginUser, getNewsPage, getUpload, postUpload, uploadMultiFiles, getManagement, getUpdatePage, postUpdateUser, getDeletePage, postDeleteUser } = require('../controllers/homeController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { upload, upload1 } = require('../middleware/upload');

var appRoot = require('app-root-path');

//khai bao route
router.get('/', getHomePage);

router.get('/login', getLogin);
router.post('/login', postLoginUser);

router.get('/create', getCreateUser);
router.post('/create', postCreateUser);

router.get('/news', getNewsPage);

router.get('/management', getManagement);

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

router.get('/update/:id', getUpdatePage);
router.post('/update-user', postUpdateUser);

router.get('/delete/:id', getDeletePage);
router.post('/delete-user', postDeleteUser);

module.exports = router;