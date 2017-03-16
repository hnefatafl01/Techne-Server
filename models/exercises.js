const bookshelf = require('../db/bookshelf');

require('./goals');
var Exercise = bookshelf.Model.extend({
  tableName: 'exercise',
  goal: function () {
    return this.belongsToMany('Goal').through('GoalExercise')

  }
})

module.exports = bookshelf.model('Exercise', Exercise);
