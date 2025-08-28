const express = require('express');
const router = express.Router();
const { getAllUsers, createNewUser, updateUser, deleteUser, loginUser,logoutUser, getUserAPI } = require('../controllers/APIController.js');
const { authTokenAPI } = require('../middleware/authTokenAPI.js')

//khai bao route
const initAPIRoute = (app) => {
    router.get('/users', getAllUsers);
    router.post('/users', createNewUser);
    router.put('/users/:id', updateUser);
    router.delete('/users/:id', deleteUser);
    router.post('/login', loginUser);
    router.post('/logout',logoutUser);
    router.get('/me',authTokenAPI,getUserAPI);
    
    
    app.use('/api/v1/', router)
}


module.exports = initAPIRoute;