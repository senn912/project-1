const connection = require('../config/database');
const { postCheckUser, postCheckNickname, postInsertUser } = require('../services/CRUDServices');
const multer = require('multer');

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
      return res.send(`
        <script>
          
            alert("login success");
            window.location.href = "/";
          
        </script>
      `);
    }
  }

  return res.send(`
                <script>
                  
                    alert("Wrong Nickname or Password");
                    window.location.href = "/login";
              
                </script>
              `);

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

const getNewsPage = (req, res) => {
  res.render('news.ejs');
}

const getUpload = (req, res) => {
  res.render('upload.ejs');
}

// const upload = multer().single('profile_pic');

const postUpload = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  console.log(req.file);

  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  else if (!req.file) {
    return res.send('Please select an image to upload');
  }
  // else if (req instanceof multer.MulterError) {
  //   return res.send(req.err);
  // }
  // else if (req.err) {
  //   return res.send(req.err);
  // }

  // Display uploaded image
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
  else if (!req.files) {
    return res.send('Please select an image to upload');
  }
  // else if (req instanceof multer.MulterError) {
  //   return res.send(req);
  // }
  // else if (req.err) {
  //   return res.send(req.err);
  // }

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




module.exports = {
  getHomePage,
  getLogin,
  postLoginUser,
  getCreateUser,
  postCreateUser,
  getNewsPage,
  getUpload,
  postUpload,
  uploadMultiFiles

}