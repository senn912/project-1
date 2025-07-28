const { json } = require("express");
const connection = require('../config/database');
const { postInsertUser, putupdateUser, checkId, deleteUserById, postCheckNickname, postCheckEmail } = require('../services/CRUDServices')
const bcrypt = require('bcrypt');
const saltRounds = 10;


const getAllUsers = async (req, res) => {
    const [rows, fields] = await connection.execute('select * from Users');

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

const createNewUser = async (req, res) => {
    const { email, fullName, nickName, password } = req.body || {};

    if (!email || !fullName || !nickName || !password) {
        return res.status(400).json({
            message: 'missing',
        })
    }
    if (!email.includes('@')) {
        return res.status(400).json({
            message: 'wrong format of email'
        })
    }
    let [rowsNickname] = await postCheckNickname(nickName);
    if (rowsNickname.length > 0) {
        return res.status(400).json({
            message: 'nickname has existed'
        })
    }
    let [rowsEmail] = await postCheckEmail(email);
    if (rowsEmail.length > 0) {
        return res.status(400).json({
            message: 'Email has existed'
        })
    }
    await postInsertUser(email, fullName, nickName, password);
    return res.status(201).json({
        message: 'ok',
    })

}


const updateUser = async (req, res) => {
    const { email, fullName, password } = req.body || {};
    const id = req.params.id

    if (!email.includes('@')) {
        return res.status(400).json({
            message: 'wrong format of email'
        })
    }

    if (!email || !fullName || !password) {
        return res.status(404).json({
            message: 'missing infor',
        })
    }
    await putupdateUser(id, email, fullName, password);
    res.status(200).json({
        message: 'Updated',
    });
};


const deleteUser = async (req, res) => {
    const id = req.params.id || {};
    if (!id) {
        return res.status(404).json({
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

const loginUser = async (req, res) => {
    const { nickName, password } = req.body || {};
    let [rows] = await postCheckNickname(nickName);
    if (rows.length > 0) {
        const user = rows[0];
        console.log("check user: ", user)
        const match = await bcrypt.compare(password, user.password);
        req.session.user = {
            id: user.id,
            fullName: user.fullName,
            nickName: user.nickName,
        };
        if (match) {
            return res.status(200).json({
                message: 'done'
            })
        }
    }
    else if (!nickName || !password) {
        return res.status(404).json({
            message: 'nickname and password are required'
        })
    }

    return res.status(404).json({
        message: 'nickname or password are wrong'
    })

}


module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    loginUser,

}
