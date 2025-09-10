const multer = require("multer");
const path = require("path");
var appRoot = require("app-root-path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("check approot: ", appRoot);
    cb(null, appRoot + "/src/public/images/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  const isImage = file.originalname.match(/\.(jpg|jpeg|png|gif)$/i);
  if (!isImage) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });
const upload1 = multer({ storage: storage, fileFilter: imageFilter }).array(
  "multiple_images",
  3
);

module.exports = {
  upload,
  upload1,
};
