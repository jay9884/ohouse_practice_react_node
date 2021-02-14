const jwt = require('jsonwebtoken');
require('dotenv').config();

const _createToken = (nickname, key) => jwt.sign({ nickname: nickname}, key, { expiresIn: '1h' });

module.exports = {
  createToken: _createToken
}