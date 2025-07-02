const connection = require('../config/database');

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

  let [rows] = await connection.execute(
    `select * from Users where nickName = ? and password = ?`, [nickName, password]
  );
  if (rows.length > 0) {
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
  let [rows] = await connection.query(
    `SELECT * FROM Users WHERE nickName = ?`,
    [nickName]
  );
  if (rows.length > 0) {
    return res.send(`
            <script>
                alert("Nickname already exists. Please choose another one.");
                window.location.href = "/create";
            </script>
        `);
  }


  let [result] = await connection.query(
    `insert into Users (email,fullName,nickName,password) values(?,?,?,?)`, [email, fullName, nickName, password],
  );

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