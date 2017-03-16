const bookshelf = require('../db/bookshelf');

require('./exercises');
const Goal = bookshelf.Model.extend({
  tableName: 'goal',
  exercise: function () {
    return this.belongsToMany('Exercise').through('GoalExercise')
  },
  session: function () {
    return this.belongsToMany('Session')
  }
});

module.exports = bookshelf.model('Goal', Goal);
