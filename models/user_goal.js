const bookshelf = require('../db/bookshelf');

const UserGoal = bookshelf.Model.extend({
  tableName: 'user_goal',
  goals: function() {
    return this.hasMany('Goal')
  },
  users: function() {
    return this.hasMany('User')
  }
})

module.exports = bookshelf.model('UserGoal', UserGoal);
