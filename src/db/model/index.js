const User = require('./user')
const Blog = require('./blogs')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}