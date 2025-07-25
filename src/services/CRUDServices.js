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
    // Lấy thông tin cũ của user để giữ nguyên nếu không sửa
    const [rows] = await connection.query(`SELECT * FROM Users WHERE id = ?`, [id]);
    const user = rows[0];
    if (!user) throw new Error('User not found');

    // Giữ nguyên giá trị nếu không nhập mới
    email = email || user.email;
    fullName = fullName || user.fullName;

    let query = `UPDATE Users SET email = ?, fullName = ?`;
    let params = [email, fullName];

    if (password && typeof password === 'string' && password.trim() !== '') {
        const hashedPassword = await bcrypt.hash(password, 10);
        query += `, password = ?`;
        params.push(hashedPassword);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    const [result] = await connection.query(query, params);
    return result;
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

const getAllUsers = async () => {
    let [result, fields] = await connection.query('select *from Users');
    return result;
}




module.exports = {
    postCheckUser,
    postCheckNickname,
    postInsertUser,
    putupdateUser,
    checkId,
    deleteUserById,
    getAllUsers,

}