const connection = require("../config/database");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const postCheckUser = async (nickName) => {

    let [rows] = await connection.execute(
        `select * from Users where nickName = ? `, [nickName]
    );
    return [rows]
}

const postCheckNickname = async (nickName) => {
    let [rows] = await connection.query(
        `SELECT * FROM Users WHERE nickName = ?`,
        [nickName]
    );
    return [rows]
}

const postInsertUser = async (email, fullName, nickName, password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    let [result] = await connection.query(
        `insert into Users (email,fullName,nickName,password) values(?,?,?,?)`, [email, fullName, nickName, hashedPassword],
    );
    return [result]
}

const putupdateUser = async (id, email, fullName, password) => {
    if (!password || typeof password !== 'string') {
        throw new Error('Invalid password');
    }
    console.log("password : ", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    let [result] = await connection.query(
        `UPDATE Users SET email = ?, fullName = ?, password = ? WHERE id = ?`,
        [email, fullName, hashedPassword, id]
    );
    return [result];
};

const checkId = async (id) => {

    const [rows] = await connection.execute(
        'select * FROM Users WHERE id = ?', [id]
    );
    return rows;
}

const deleteUserById = async (id) => {
    const [rows] = await connection.execute(
        'delete FROM Users WHERE id = ?', [id]
    );
    return rows;

}

module.exports = {
    postCheckUser,
    postCheckNickname,
    postInsertUser,
    putupdateUser,
    checkId,
    deleteUserById,

}