const multer = require("multer");

const uploadFiles = (req, res, next) => {
  // Start by creating some disk storage options:
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, __dirname + "/uploads");
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
    // Sets saved filename(s) to be original filename(s)
  });

  const upload = multer({ storage: storage });

  upload.array(req);
};

module.exports = uploadFiles;

// https://openjavascript.info/2023/01/09/handle-a-file-upload-in-node-js-and-express-with-multer/

//stackoverflow.com/questions/43692479/how-to-upload-an-image-in-react-js
// https://www.npmjs.com/package/compress.js

// https://www.youtube.com/watch?v=TZvMLWFVVhE

// https://www.youtube.com/watch?v=4pmkQjsKJ-U
