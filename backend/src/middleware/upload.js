const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path');

// Cấu hình nơi lưu file và tên file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('check approot: ', appRoot)
        cb(null, appRoot + "/src/public/images/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    const isImage = file.originalname.match(/\.(jpg|jpeg|png|gif)$/i);
    if (!isImage) {
        //req.fileValidationError = 'Only image files are allowed!';
        return cb(null, false); // Không lưu file, không gây lỗi, cho phép qua tiếp
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });
const upload1 = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

// Xuất ra
module.exports = {
    upload,
    upload1
};
