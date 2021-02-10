const db = require('../../../helper/db');

const PRODUCTIONS = 'ohouse_item';
const CATEGORY = 'item_category';
const THUMBNAIL = 'item_thumbnail';
const IMAGE = 'item_image';
const OPTION = 'item_option';
const ADDOPTION = 'item_add_option';
const DELIVERY = 'item_delivery';
const DETAIL = 'item_detail';

const itemFindAll = () => {
  return Promise.all([
    db(PRODUCTIONS)
      .select("pro_id", "pro_title")
      .then(([...item]) => item),
    // db(THUMBNAIL)
    //   .select(`${PRODUCTIONS}.pro_id`, "pro_title")
    //   .join(PRODUCTIONS, `${THUMBNAIL}.pro_id`, `${PRODUCTIONS}.pro_id`)
    //   .then(([...item]) =>  item),
    db(PRODUCTIONS)
      .count({total: 'pro_id'})
  ]).then(([item, [{total}]]) => ({
      total,
      rows: item
    }))
}

const itemFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return db(PRODUCTIONS)
    .select('*')
    .andWhere('pro_id', id)
    .then(([item]) => (item))
}

const categoryFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return db(CATEGORY)
    .select('*')
    .andWhere('pro_id', id)
    .then(([...item]) => (item))
}

const thumbnailFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return db(THUMBNAIL)
    .select('*')
    .andWhere('pro_id', id)
    .then(([...item]) => (item))
}

const imageFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return db(IMAGE)
    .select('*')
    .andWhere('pro_id', id)
    .then(([...item]) => (item))
}

const optionFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return db(OPTION)
    .select('*')
    .andWhere('pro_id', id)
    .then(([...item]) => (item))
}

const addOptionFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return db(ADDOPTION)
    .select('*')
    .andWhere('pro_id', id)
    .then(([...item]) => (item))
}

const deliveryFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return db(DELIVERY)
    .select('*')
    .andWhere('pro_id', id)
    .then(([item]) => (item))
}

const detailFindById = (id) => {
  if(!id) {
    return Promise.reject('조회한 상품이 없습니다');
  }

  return db(DETAIL)
    .select('*')
    .andWhere('pro_id', id)
    .then(([item]) => (item))
}

module.exports = {
  itemFindAll,
  itemFindById,
  categoryFindById,
  thumbnailFindById,
  imageFindById,
  optionFindById,
  addOptionFindById,
  deliveryFindById,
  detailFindById
}