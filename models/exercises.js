'use strict';

const bookshelf = require('../db/bookshelf');

var Exercise = bookshelf.Model.extend({
  tableName: 'exercise',
  goal: function () {
    return this.belongsToMany('goal').through('GoalExercise')

  }
})

module.exports = Exercise;
