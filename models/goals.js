const bookshelf = require('../db/bookshelf');

require('./exercises');
const Goal = bookshelf.Model.extend({
  tableName: 'goal',
  exercise: function () {
    return this.belongsToMany('Exercise').through('GoalExercise')
  }
  ,
  user: function () {
    return this.belongsTo('User')
  }
});

module.exports = bookshelf.model('Goal', Goal);
