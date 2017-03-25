const bookshelf = require('../db/bookshelf');

require('./users')
require('./sessions')
const UserSession = bookshelf.Model.extend({
  tableName: 'user_session',
  sessions: function() {
    return this.hasMany('Session')
  },
  users: function() {
    return this.hasMany('User')
  }
})

module.exports = bookshelf.model('UserSession', UserSession);
