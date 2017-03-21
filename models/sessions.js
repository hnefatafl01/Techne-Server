const bookshelf = require('../db/bookshelf');

require('./exercises');
require('./goals');

const Sessions = bookshelf.Model.extend({
  tableName: 'session',
  goals: function () {
    return this.hasMany('Goal')
  }
  ,
  exercises: function() {
    return this.belongsToMany('Exercise','session_exercise').withPivot(['exercise_id','session_id'])
  }
});

module.exports = bookshelf.model('Sessions', Sessions);
