const seq = require('../seq')
const { INTEGER } = require('../types')


const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注的 id'
  }
})

module.exports = UserRelation