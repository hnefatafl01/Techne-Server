const bookshelf = require('../db/bookshelf');

require('./sessions');
require('./goals');

const Users = bookshelf.Model.extend({
  tableName: 'user',
  goals: function () {
    return this.hasMany('Goal')
  }
  ,
  sessions: function() {
    return this.belongsToMany('Session','user_session').withPivot(['user_id','session_id'])
  }
});

module.exports = bookshelf.model('Users', Users);
