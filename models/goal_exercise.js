const bookshelf = require('../db/bookshelf');

const GoalExercise = bookshelf.Model.extend({
  tableName: 'goal_exercise',
  goals: function(){
    return this.hasMany('Goal');
  },
  exercises: function() {
    return this.hasMany('Exercise');
  }
})

module.exports = bookshelf.model('GoalExercise', GoalExercise);
