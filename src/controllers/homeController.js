const connection = require('../config/database');
const { postCheckUser, postCheckNickname, postInsertUser, getAllUsers, deleteUserById, putupdateUser } = require('../services/CRUDServices');
const multer = require('multer');

const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your_secret_key';



const checkJWT = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.send(' No token found in cookies');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.send('Invalid or expired token');
    }

    return res.send(`Token is valid. Hello ${decoded.fullName}`);
  });
};


const getHomePage = (req, res) => {
  const user = res.locals.user || null;
  return res.render('home.ejs', { user });
};


const getLogin = ((req, res) => {
  res.render('login.ejs');
});

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
    const user = rows[0];
    console.log("check user: ", user)
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      //   gan session khi dang nhap dung
      req.session.user = {
        id: user.id,
        fullName: user.fullName,
        nickName: user.nickName,
      };

      return res.redirect('/');
    }
  }

  // wrong
  return res.send(`
    <script>
      alert("Wrong Nickname or Password");
      window.location.href = "/login";
    </script>
  `);
};

const postCreateUser = async (req, res) => {

  let email = req.body.email;
  let fullName = req.body.fullName;
  let nickName = req.body.nickName;
  let password = req.body.password;
  if (!email || !fullName || !nickName || !password) {
    return res.send(`
            <script>
                alert("Fill full the information");
                window.location.href = "/create";
            </script>
        `);
  }
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

const getNewsPage = (req, res) => {
  const user = res.locals.user || null;
  return res.render('news.ejs', { user });
}

const getUpload = (req, res) => {
  res.render('upload.ejs')
}



const postUpload = async (req, res) => {

  console.log(req.file);

  if (req.fileValidationError) {
    return res.send(`
      <script>
          window.onload = function() {
            alert("It is not image file");
            window.location.href = "/upload";
                  };
      </script>
              `);
  }
  else if (!req.file) {
    return res.send(`
      <script>
          window.onload = function() {
            alert("Please choose the image file to upload");
            window.location.href = "/upload";
                  };
      </script>
              `);
  }

  res.send(`
    You have uploaded this image:
    <hr/>
    <img src="/images/${req.file.filename}" width="500">
    <hr/>
    <a href="/upload">Upload another image</a>
  `);
};

const uploadMulti = multer().array('multiple_images', 3);
const uploadMultiFiles = async (req, res) => {


  console.log(req.files)
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  else if (!req.files || req.files == 0) {
    return res.send(`
      <script>
          window.onload = function() {
            alert("Please choose the image file to upload");
            window.location.href = "/upload";
                  };
      </script>
              `);
  }


  let result = "You have uploaded these images: <hr />";
  const files = req.files;
  let index, len;

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
  }
  result += '<hr/><a href="./upload">Upload more images</a>';
  res.send(result);
};

const getManagement = async (req, res) => {

  const result = await getAllUsers();
  res.render('management.ejs', {
    user: res.locals.user,
    listUsers: result
  });
}

const getUpdatePage = async (req, res) => {

  const userId = req.params.id;
  let [result, fields] = await connection.query('select * from Users where id = ?', [userId]);
  console.log(">>>check results: ", result)

  let user = result && result.length > 0 ? result[0] : {};

  res.render('update.ejs', {
    userEdit: user,
    user: req.user || res.locals.user
  });
}

const postUpdateUser = async (req, res) => {
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
  let { id, email, fullName, password } = req.body;

  try {
    await putupdateUser(id, email, fullName, password);
    res.send(`<script>
          window.onload = function() {
            alert("Updated");
            window.location.href = "/management";
                  };
      </script>
              `)
    res.redirect('/management');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
};


const getDeletePage = async (req, res) => {

  const userId = req.params.id;
  let [result, fields] = await connection.query('select * from Users where id = ?', [userId]);
  let user = result && result.length > 0 ? result[0] : {};
  res.render('delete.ejs', { userDelete: user });
}

const postDeleteUser = async (req, res) => {
  let userId = req.body.userId;


  await deleteUserById(userId)
  res.send(
    `<script>
          window.onload = function() {
            alert("Deleted");
            window.location.href = "/management";
                  };
      </script>
              `);

}

module.exports = {
  getHomePage,
  getLogin,
  postLoginUser,
  getCreateUser,
  postCreateUser,
  getNewsPage,
  getUpload,
  postUpload,
  uploadMultiFiles,
  getManagement,
  getUpdatePage,
  postUpdateUser,
  getDeletePage,
  postDeleteUser,
  checkJWT,


}