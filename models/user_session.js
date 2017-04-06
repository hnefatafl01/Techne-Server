const bookshelf = require('../db/bookshelf');
require('./users')
require('./sessions')

const UserSession = bookshelf.Model.extend({
  tableName: 'user_session',
  sessions: function() {
    return this.hasMany('Sessions')
  },
  user: function() {
    return this.hasMany('User')
  }
})

module.exports = bookshelf.model('UserSession', UserSession);
