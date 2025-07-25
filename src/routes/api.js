const express = require('express');
const router = express.Router();
const { getAllUsers, createNewUser, updateUser, deleteUser, loginUser } = require('../controllers/APIController.js');
// const APIController = require('../controllers/APIController');

//khai bao route
const initAPIRoute = (app) => {
    router.get('/users', getAllUsers);
    router.post('/users', createNewUser);
    router.put('/users/', updateUser);
    router.delete('/users/', deleteUser);
    router.post('/login',loginUser);

    app.use('/api/v1/', router)
}


module.exports = initAPIRoute;