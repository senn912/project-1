const express = require('express');
const router = express.Router();
const { getAllUsers, createNewUser, updateUser, deleteUser } = require('../controllers/APIController.js');
// const APIController = require('../controllers/APIController');

//khai bao route
const initAPIRoute = (app) => {
    router.get('/users', getAllUsers);
    router.post('/create-user', createNewUser);
    router.put('/update-user/', updateUser);
    router.delete('/delete-user/:id', deleteUser);

    app.use('/api/v1/', router)
}


module.exports = initAPIRoute;