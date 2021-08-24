const seq = require('../seq')
const {STRING, INTEGER, TEXT} = require('../types')

const Blogs = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户名唯一'
  },
  content: {
    type: TEXT,
    allowNull: false,

  },
  image: {
    type: STRING
  }
})

module.exports = Blogs