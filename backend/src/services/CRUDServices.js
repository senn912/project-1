const connection = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const postCheckUser = async (nickName) => {
  let [rows] = await connection.execute(
    `select * from Users where nickName = ? `,
    [nickName]
  );
  return [rows];
};

const postCheckNickname = async (nickName) => {
  let [rows] = await connection.query(
    `SELECT * FROM Users WHERE nickName = ?`,
    [nickName]
  );
  return [rows];
};
const postCheckEmail = async (email) => {
  let [rows] = await connection.query(`SELECT * FROM Users WHERE email = ?`, [
    email,
  ]);
  return [rows];
};

const postInsertUser = async (email, fullName, nickName, password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  let [result] = await connection.query(
    `insert into Users (email,fullName,nickName,password) values(?,?,?,?)`,
    [email, fullName, nickName, hashedPassword]
  );
  return [result];
};

const putUpdateUser = async (id, email, fullName) => {
  const [rows] = await connection.query(`SELECT * FROM Users WHERE id = ?`, [
    id,
  ]);
  const user = rows[0];
  if (!user) throw new Error("User not found");

  email = email || user.email;
  fullName = fullName || user.fullName;

  let query = `UPDATE Users SET email = ?, fullName = ?`;
  let params = [email, fullName];

  query += ` WHERE id = ?`;
  params.push(id);

  const [result] = await connection.query(query, params);
  return result;
};

const checkUserById = async (id) => {
  const [rows] = await connection.execute("SELECT * FROM Users WHERE id = ?", [
    id,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

const deleteUserById = async (id) => {
  const [rows] = await connection.execute("delete FROM Users WHERE id = ?", [
    id,
  ]);
  return rows;
};

const getAllUsers = async () => {
  let [result, fields] = await connection.query("select *from Users");
  return result;
};

module.exports = {
  postCheckUser,
  postCheckNickname,
  postInsertUser,
  putUpdateUser,
  deleteUserById,
  getAllUsers,
  postCheckEmail,
  checkUserById,
};
