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
    item: {}, category:{}, 
    thumbnail: {}, image: {}, 
    option: {}, add_option: {}, 
    delivery: {}, detail: {}
  }
 
  try {
    const item = await knexquery.itemFindById(id);
    if(!item) {
      res.status(404).json({})
      return
    }
    result.item = item;
  } catch(err) {
    console.error(err);
  }

  try {
    const category = await knexquery.categoryFindById(id);
    if(!category) {
      res.status(404).json({})
      return
    }
    result.category = category;
  } catch(err) {
    console.error(err);
  }

  try {
    const thumb = await knexquery.thumbnailFindById(id);
    if(!thumb) {
      res.status(404).json({})
      return
    }
    result.thumbnail = thumb;
  } catch(err) {
    console.error(err);
  }

  try {
    const image = await knexquery.imageFindById(id);
    if(!image) {
      res.status(404).json({})
      return
    }
    result.image = image;
  } catch(err) {
    console.error(err);
  }

  try {
    const option = await knexquery.optionFindById(id);
    if(!option) {
      res.status(404).json({})
      return
    }
    result.option = option;
  } catch(err) {
    console.error(err);
  }

  try {
    const add_option = await knexquery.addOptionFindById(id);
    if(!add_option) {
      res.status(404).json({})
      return
    }
    result.add_option = add_option;
  } catch(err) {
    console.error(err);
  }

  try {
    const delivery = await knexquery.deliveryFindById(id);
    if(!delivery) {
      res.status(404).json({})
      return
    }
    result.delivery = delivery;
  } catch(err) {
    console.error(err);
  }

  try {
    const detail = await knexquery.detailFindById(id);
    if(!detail) {
      res.status(404).json({})
      return
    }
    result.detail = detail;
  } catch(err) {
    console.error(err);
  }
  
  result_arr.push(result);
  return res.json(result_arr);
})

module.exports = router;