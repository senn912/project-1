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
module.exports = {
    postCheckUser,
    postCheckNickname,
    postInsertUser,
}