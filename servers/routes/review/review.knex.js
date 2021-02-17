const db = require('../../../helper/db');

const USER = 'user'
const REVIEW = 'item_review';

//리뷰등록
const reviewCreate = review => {
  return db(REVIEW).insert(review)
}

const reviewFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return Promise.all([
    db(REVIEW)
      .select('*')
      .andWhere('pro_id', id)
      .then(([...item]) => (item)),
    db(REVIEW)
      .count({total: 'pro_id'})
      .andWhere('pro_id', id)
  ]).then(([item, [{total}]]) => ({
      total,
      rows: item
    }))
}

const onlyReviewImgFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return db(REVIEW)
    .select('img_filename', 'id')
    .innerJoin(USER, `${USER}.user_idx`, `${REVIEW}.user_id`)
    .andWhere('pro_id', id)
    .then(([...item]) => (item))
}

module.exports = {
  reviewCreate,
  reviewFindById,
  onlyReviewImgFindById
}