const connection = require('../config/database');
const { postCheckUser, postCheckNickname, postInsertUser } = require('../services/CRUDServices');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const getHomePage = (req, res) => {
  res.render('home.ejs');
}

const getLogin = (req, res) => {
  res.render('login.ejs');
}

const getCreateUser = (req, res) => {
  res.render('create.ejs');
}

const postLoginUser = async (req, res) => {
  let nickName = req.body.nickName;
  let password = req.body.password;

  console.log(">>>>>nickname ", nickName);
  console.log(">>>password ", password);

  let [rows] = await postCheckUser(nickName);
  if (rows.length > 0) {
    const match = await bcrypt.compare(password, rows[0].password);
    if (match) {
      res.send(`
        <script>
          window.onload = function() {
            alert("login success");
            window.location.href = "/";
          };
        </script>
      `);
    }

    else {
      res.send(`
                <script>
                  window.onload = function() {
                    alert("Wrong Nickname or Password");
                    window.location.href = "/login";
                  };
                </script>
              `);

    }
  }


}




const postCreateUser = async (req, res) => {

  let email = req.body.email;
  let fullName = req.body.fullName;
  let nickName = req.body.nickName;
  let password = req.body.password;

  // check email
  if (!email.includes('@')) {
    return res.send(`
            <script>
                alert("Invalid email format. Must contain '@'");
                window.location.href = "/create";
            </script>
        `);
  }
  // check nickname ton tai
  let [rows] = await postCheckNickname(nickName);
  if (rows.length > 0) {
    return res.send(`
            <script>
                alert("Nickname already exists. Please choose another one.");
                window.location.href = "/create";
            </script>
        `);
  }


  let [result] = await postInsertUser(email, fullName, nickName, password);


  console.log(">>> check result ", result);
  res.send(
    `
      <script>
          window.onload = function() {
            alert("Create success");
            window.location.href = "/login";
                  };
      </script>
              `
  );

}


module.exports = {
  getHomePage,
  getLogin,
  postLoginUser,
  getCreateUser,
  postCreateUser,

}