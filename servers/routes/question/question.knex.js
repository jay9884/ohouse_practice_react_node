const db = require('../../../helper/db');

const USER = 'user';
const QUESTION = 'item_question';

//문의등록
const questionCreate = question=> {
  return db(QUESTION).insert(question)
}

const questionFindById = (id, page, pageSize) => {
  const offset = (+page - 1) * + pageSize;

  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return Promise.all([
    db(QUESTION)
      .select('question_id', `${USER}.nickname`, `${QUESTION}.pro_id`, `${QUESTION}.contents`, `${QUESTION}.created_at`, `${QUESTION}.kind_of_question`)
      .innerJoin(USER, `${USER}.user_idx`, `${QUESTION}.user_id`)
      .andWhere('pro_id', id)
      .orderBy(`${QUESTION}.question_id`, 'desc')
      .limit(pageSize)
      .offset(offset)
      .then(([...item]) => (item)),
    db(QUESTION)
      .count({total: 'pro_id'})
      .andWhere('pro_id', id)
  ]).then(([item, [{total}]]) => ({
      total,
      rows: item
    }))
}

module.exports = {
  questionCreate,
  questionFindById
}