const db = require('../../../helper/db');

const USER = 'user'

//유저조회
const userFindAll = (page, pageSize) => {
  const offset = (+page - 1) * + pageSize;

  return Promise.all([
    db(USER)
      .select('user_idx', 'id', 'kakaoLogin', 'nickname')
      .andWhere('enabled', 'enabled')
      .limit(pageSize)
      .offset(offset)
      .then(([...item]) => item),
    db(USER)
    .count({total: 'user_idx'})
    .andWhere('enabled', 'enabled')
  ]).then(([rows, [{total}]]) => ({
      page: +page,
      pageSize: +pageSize,
      total,
      items: rows
    }))
}

//중복확인
const userCheckById = id => {
  if (!id) {
    return Promise.reject('id 값이 없습니다.')
  }

  return db(USER)
    .select('id')
    .andWhere('id', id)
    .then(([item]) => item)
}

const userCheckByName = nickname => {
  if (!nickname) {
    return Promise.reject('nickname 값이 없습니다.')
  }

  return db(USER)
    .select('nickname')
    .andWhere('nickname', nickname)
    .then(([item]) => item)
}


//회원가입
const userCreate = user => {
  return db(USER).insert(user)
}

//로그인
const userFindById = id => {
  if (!id) {
    return Promise.reject('id 값이 없습니다.')
  }

  return db(USER)
    .select('*')
    .andWhere('id', id)
    .then(([item]) => item)
}

// const userUpdate = (id, user) => {
//   return db(ACCOUNT)
//     .update(user)
//     .andWhere('id', id)
// }

module.exports = {
  userFindAll,
  userCreate,
  userCheckById,
  userCheckByName,
  userFindById
}