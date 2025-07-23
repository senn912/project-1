const { json } = require("express");
const connection = require('../config/database');
const { postInsertUser, putupdateUser, checkId, deleteUserById } = require('../services/CRUDServices')



const getAllUsers = async (req, res) => {
    const [rows, fields] = await connection.execute('select * from Users');

    return res.status(200).json({
        message: 'zzz',
        data: rows
    })
}

const createNewUser = async (req, res) => {

    

    const { email, fullName, nickName, password } = req.body || {};
    if (!email || !fullName || !nickName || !password) {
        return res.status(200).json({
            message: 'missing',
        })
    }

    await postInsertUser(email, fullName, nickName, password);
    res.status(200).json({
        message: 'ok',

    })

}


const updateUser = async (req, res) => {
    const { id, email, fullName, password } = req.body || {};
    if (!id) {
        return res.status(200).json({
            message: 'missing id',
        })
    }
    const rows = await checkId(id);

    if (rows.length === 0) {
        return res.status(404).json({
            message: 'ID not found',
        });
    }
    if (!email || !fullName || !password) {
        return res.status(200).json({
            message: 'missing infor',
        })
    }
    await putupdateUser(id, email, fullName, password);
    res.status(200).json({
        message: 'Updated',
    });
};


const deleteUser = async (req, res) => {
    const id = req.query.id || {};
    if (!id) {
        return res.status(200).json({
            message: 'missing',
        })
    }
    const rows = await checkId(id);

    if (rows.length === 0) {
        return res.status(404).json({
            message: 'ID not found',
        });
    }
    await deleteUserById(id);
    res.status(200).json({
        message: 'Deleted',
    });
}

module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
}
