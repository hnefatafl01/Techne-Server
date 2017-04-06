const bookshelf = require('../db/bookshelf');
require('./sessions');
require('./goals');


const User = bookshelf.Model.extend({
  tableName: 'user',
  goals: function () {
    return this.belongsToMany('Goal').through('UserGoal')
  },
  sessions: function() {
    return this.belongsToMany('Sessions').through('UserSession')
  }
});

module.exports = bookshelf.model('User', User);
