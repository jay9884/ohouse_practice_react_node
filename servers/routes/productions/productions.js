const express = require('express');
const router = express.Router();

const knexquery = require('./productions.knex');

router.get('/', (req, res) => {
  console.log("productions!");

  return knexquery.itemFindAll()
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      console.log(e)
      res.status(500).json(e)
    })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let result_arr = [];
  let result = {
    items: {}, category:{}, 
    thumbnail: {}, image: {}, 
    option: {}, add_option: {}, 
    delivery: {}, detail: {}
  }
 
  try {
    const item = await knexquery.itemFindById(id);
    result.items = {...item};
  } catch(err) {
    console.error(err);
  }

  try {
    const category = await knexquery.categoryFindById(id);
    result.category = {...category};
  } catch(err) {
    console.error(err);
  }

  try {
    const thumb = await knexquery.thumbnailFindById(id);
    result.thumbnail = {...thumb};
  } catch(err) {
    console.error(err);
  }

  try {
    const image = await knexquery.imageFindById(id);
    result.image = {...image};
  } catch(err) {
    console.error(err);
  }

  try {
    const option = await knexquery.optionFindById(id);
    result.option = {...option};
  } catch(err) {
    console.error(err);
  }

  try {
    const add_option = await knexquery.addOptionFindById(id);
    result.add_option = {...add_option};
  } catch(err) {
    console.error(err);
  }

  try {
    const delivery = await knexquery.deliveryFindById(id);
    result.delivery = {...delivery};
  } catch(err) {
    console.error(err);
  }

  try {
    const detail = await knexquery.detailFindById(id);
    result.detail = {...detail};
  } catch(err) {
    console.error(err);
  }
  
  result_arr.push(result);
  return res.json(result_arr);
})

module.exports = router;