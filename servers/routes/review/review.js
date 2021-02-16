const express = require('express');
const router = express.Router();
const path = require("path");
const app = express();
const multer = require("multer");

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "./public/review/",
  filename: function(req, file, cb) {
    cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});

router.post("/img/product_id/:id", upload.single("img"), function(req, res, next) {
  console.log(req.file);
  res.send({
    fileName: req.file.filename
  });
});

module.exports = router;