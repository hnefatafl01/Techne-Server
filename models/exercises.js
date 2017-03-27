const bookshelf = require('../db/bookshelf');

require('./goals');
require('./sessions');
require('./session_exercise');

var Exercise = bookshelf.Model.extend({
  tableName: 'exercise',
  goal: function() {
    return this.belongsToMany('Goal')
    .through('GoalExercise')
  }
  ,
  sessions:function() {
    return this.hasMany('Session','session_exercise').withPivot('session_id')
  }
})

module.exports = bookshelf.model('Exercise', Exercise);
