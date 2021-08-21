const seq = require('../seq')
const {STRING, DECIMAL} = require('../types')

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: false,
    comment: '用户名唯一'
  },
  password: {
    type: STRING,
    allowNull: false,

  },
  nickName: {
    type: STRING,
    allowNull: false
  },
  gender: {
    type: DECIMAL,
    allowNull:false,
    comment: '1男1女3保密'
  },
  picture: {
    type: STRING,
    comment: '头像'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = User