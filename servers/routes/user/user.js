const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {getSalt, getExpiredTime, getHash} = require('../lib/hash');
const knexquery = require('../user/user.knex');
const {createToken} = require('../lib/token');

const connectStatus = {}

router.get('/', (req, res) => {
  console.log('users');
})

// 유저 목록을 조회 API
router.get('/user_list', (req, res) => {
  const page = req.query.page === undefined ? 1 : +req.query.page
  const pageSize = req.query.pageSize === undefined ? 10 : +req.query.pageSize
  const name = req.query.name2

  if (isNaN(page)) {
    res.status(400).json({message: 'page의 값이 숫자가 아닙니다.'})
    return
  }
  if (isNaN(pageSize)) {
    res.status(400).json({message: 'pageSize의 값이 숫자가 아닙니다.'})
    return
  }

  return knexquery.userFindAll(page, pageSize)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      console.log(e)
      res.status(500).json(e)
    })
})

// 유저 생성 API
router.post('/signup', async (req, res) => {
  console.log('signup??')
  const {id, pw, nickname, commercial} = req.body;
  console.log(id, pw, nickname, commercial);
  if(!id) {
    res.status(400).json({message: '아이디가 입력되지 않았습니다.'});
  }
  if (!pw) {
    res.status(400).json({message: '패스워드가 입력되지 않았습니다.'});
    return
  }
  if (pw.length < 8) {
    res.status(400).json({message: '패스워드는 8자 이상 입력하셔야 합니다.'});
    return
  }
  if (!nickname) {
    res.status(400).json({message: '닉네임이 입력되지 않았습니다.'});
    return
  }
  if (nickname.length > 15 || nickname.length < 2) {
    res.status(400).json({message: '닉네임은 2자 이상 15자이하로 입력하셔야 합니다.'});
    return
  }
  if (commercial.length === 0) {
    res.status(400).json({message: '마케팅 수신여부가 입력되지 않았습니다.'});
    return
  }

  const salt = getSalt();
  const user = {
    id,
    salt,
    pw: getHash(pw, salt),
    nickname,
    commercial,
    enabled: 'enabled'
  }

  try {
    const existed_id = await knexquery.userCheckById(user.id);
    if(existed_id.id) {
      res.status(400).json({message: '중복된 아이디입니다.'});
      return
    }
  } catch(err) {
    console.error(err);
  }

  try {
    const existed_name = await knexquery.userCheckByName(user.nickname);
    if(existed_name.nickname) {
      res.status(400).json({message: '중복된 닉네임입니다.'});
      return
    }
  } catch(err) {
    console.error(err);
  }

  try {
    const new_user = await knexquery.userCreate(user);
    res.json({
      signed_up: true,
      id: user.id,
      name: user.nickname
    })
  } catch(err) {
    console.error(err);
  }
})

// 유저 로그인 API
router.post('/login', (req, res) => {
  // 로그인 API 구현
  const {id, pw} = req.body;

  return knexquery.userFindById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({message: '아이디 혹은 비밀번호를 잘못 입력하셨습니다.'})
        return
      }

      if (user.pw !== getHash(pw, user.salt)) {
        res.status(401).json({message: '아이디 혹은 비밀번호를 잘못 입력하셨습니다.'})
        return
      }

      //토큰 및 세션 만료 시간
      const key = process.env.REACT_APP_SECRET_KEY;
      const token = createToken(user.nickname, key);

      const expired = getExpiredTime();
      connectStatus[id] = {
        token, expired
      }


      res.json({
        token, expired
      })
    })
})

router.get('/check_token', (req, res) => {
  const token = req.headers['_token_'];
  const key = process.env.REACT_APP_SECRET_KEY;
  const decoded = jwt.verify(token, key);
  const nickname = decoded.nickname;

  console.log(decoded);

  if (req.headers['access-control-request-headers'] === 'x-access-token') {
    console.log(token);
    console.log('token nono???')
    return res.json({message: '???'});
  }

  if(token) {
    return res.json({nickname: nickname});
  } else {
    console.log('유저가 로그인하지 않은 채로 사용 중입니다.');
  }
})

// 유저 상세 조회 API
router.get('/:id', (req, res) => {
  const token = req.headers['_token_'];
  const key = process.env.REACT_APP_SECRET_KEY;
  const decoded = jwt.verify(token, key);
  console.log(decoded);

  return res.json({token: token, decoded: decoded});

  // return knexquery.userFindById(id)
  //   .then(user => {
  //     if(!user) {
  //       res.status(404).json({})
  //     }

  //     res.json({
  //       id: user.id,
  //       name: user.name,
  //       createdAt: user.createdAt,
  //       updatedAt: user.updatedAt
  //     })
  //   })
})

module.exports = router;