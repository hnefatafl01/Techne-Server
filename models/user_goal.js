const bookshelf = require('../db/bookshelf');
// require('./users')
// require('./goals')

const UserGoal = bookshelf.Model.extend({
  tableName: 'user_goal',
  goal: function() {
    return this.hasMany('Goal')
  },
  user: function() {
    return this.hasMany('User')
  }
})

module.exports = bookshelf.model('UserGoal', UserGoal);
