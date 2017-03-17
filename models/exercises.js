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
  session:function() {
    return this.belongsToMany('Session')
    .through('SessionExercise')
  }
})

module.exports = bookshelf.model('Exercise', Exercise);
