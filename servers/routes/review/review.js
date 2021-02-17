const express = require('express');
const router = express.Router();
const path = require("path");
const app = express();
const multer = require("multer");

const knexquery = require('../review/review.knex');

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

router.get('/productions/:id', async (req, res) => {
  const {id} = req.params;
  let result = {
    reviewImg: {},
    reviewAll: {}
  }
  if(!id) {
    res.status(404).json({message: '요청 path가 올바르지 않습니다.'});
    return
  }

  try {
    const item = await knexquery.reviewFindById(id);
    if(!item) {
      res.status(404).json({})
      return
    }
    
    result.reviewAll = item;
  } catch(err) {
    console.error(err);
  }

  try {
    const item = await knexquery.onlyReviewImgFindById(id);
    if(!item) {
      res.status(404).json({})
      return
    }
    result.reviewImg = item;
  } catch(err) {
    console.error(err);
  }

  return res.json(result);
})

// 유저 생성 API
router.post('/product_id/:id', upload.single("img"), async (req, res) => {
  console.log('hihi');
  const { id } = req.params;
  console.log(id);
  const {star_count, contents} = req.body;
  console.log(star_count, contents);
  if(!star_count) {
    res.status(400).json({message: '별점이 입력되지 않았습니다.'});
  }
  if (!contents) {
    res.status(400).json({message: '리뷰내용이 입력되지 않았습니다.'});
    return
  }

  const review = {
    pro_id: id,
    user_id: 2, 
    star_count,
    contents,
    img_originname: req.file.originalname,
    img_filename: req.file.filename,
    img_type: req.file.originalname
  }
  console.log(req.file);
  try {
    const new_review = await knexquery.reviewCreate(review);
    res.json({
      star_count: review.star_count,
      contents: review.contents,
      img_originname: review.img_originname,
      img_filename: img_filename,
      img_type: img_type
    })
  } catch(err) {
    console.error(err);
  }
})



module.exports = router;