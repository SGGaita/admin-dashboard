const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   // console.log("Test file", req)
    cb(null, 'uploads/'); // Replace 'uploads' with your desired folder path for uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

 