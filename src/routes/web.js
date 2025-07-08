const express = require('express');
const { getHomePage, getLogin, getCreateUser, postCreateUser, postLoginUser, getNewsPage } = require('../controllers/homeController');
const router = express.Router();

//khai bao route
router.get('/', getHomePage);

router.get('/login', getLogin);
router.post('/login', postLoginUser);

router.get('/create', getCreateUser);
router.post('/create', postCreateUser);

router.get('/news',getNewsPage);


module.exports = router;