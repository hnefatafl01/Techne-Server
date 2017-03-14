'use strict';

const Bookshelf = require('../db/bookshelf');

const Goal = Bookshelf.Model.extend({
  tableName: 'goal',
  exercise: function () {
    return this.belongsToMany('exercise').through('GoalExercise')
  }
});

module.exports = Goal;
