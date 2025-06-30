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
        res.send(`<!DOCTYPE html>
    <html>
      <body>
        <script>
          window.onload = function() {
            alert("login success");
            window.location.href = "/";
          };
        </script>
      </body>
    </html>`);

    }
    else {
        res.send(`<!DOCTYPE html>
            <html>
              <body>
                <script>
                  window.onload = function() {
                    alert("Wrong Nickname or Password");
                    window.location.href = "/login";
                  };
                </script>
              </body>
            </html>`);

    }


}




const postCreateUser = async (req, res) => {

    let email = req.body.email;
    let fullName = req.body.fullName;
    let nickName = req.body.nickName;
    let password = req.body.password;

    // Kiểm tra email hợp lệ
    if (!email.includes('@')) {
        return res.send(`
            <script>
                alert("Invalid email format. Must contain '@'");
                window.location.href = "/create";
            </script>
        `);
    }
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
        `<!DOCTYPE html>
            <html>
              <body>
                <script>
                  window.onload = function() {
                    alert("Wrong Nickname or Password");
                    window.location.href = "/login";
                  };
                </script>
              </body>
            </html>`
    );

}

const getLoginUser = () => {

}
module.exports = {
    getHomePage,
    getLogin,
    getCreateUser,
    postCreateUser,
    getLoginUser,
    postLoginUser
}