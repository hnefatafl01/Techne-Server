const bookshelf = require('../db/bookshelf');
require('./sessions');
require('./goals');
// require('./user_session');

const User = bookshelf.Model.extend({
  tableName: 'user',
  goals: function () {
    return this.hasMany('Goal')
  },
  sessions: function() {
    return this.belongsToMany('Sessions').through('UserSession')
  }
});

module.exports = bookshelf.model('User', User);
