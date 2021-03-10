const express = require('express');
const router = express.Router();

const knexquery = require('./question.knex');

router.post('/productions/:id', async (req, res) => {
  const { id } = req.params;

  const { kind_of_question, contents } = req.body;
  if(!kind_of_question) {
    res.status(400).json({message: '문의종류가 선택되지 않았습니다.'});
  }
  if (!contents) {
    res.status(400).json({message: '문의내용이 입력되지 않았습니다.'});
    return
  }

  const question = {
    pro_id: id,
    user_id: 2, 
    kind_of_question,
    contents
  }


  try {
    const new_question = await knexquery.questionCreate(question);
    res.json({
      kind_of_question: question.kind_of_question,
      contents: question.contents
    })
  } catch(err) {
    res.status(401).json({message: err});
  }
})

router.get('/productions/:id', async (req, res) => {
  const page = req.query.page === undefined ? 1 : +req.query.page
  const pageSize = req.query.pageSize === undefined ? 5 : +req.query.pageSize
  const {id} = req.params;
  let result = {};

  if (isNaN(page)) {
    res.status(400).json({message: 'page의 값이 숫자가 아닙니다.'})
    return
  }
  if (isNaN(pageSize)) {
    res.status(400).json({message: 'pageSize의 값이 숫자가 아닙니다.'})
    return
  }

  if(!id) {
    res.status(404).json({message: '요청 path가 올바르지 않습니다.'});
    return
  }

  try {
    const item = await knexquery.questionFindById(id, page, pageSize);
    if(!item) {
      res.status(404).json({})
      return
    }
    res.json({question: item})
  } catch(err) {
    console.error(err);
  }
})

module.exports = router;