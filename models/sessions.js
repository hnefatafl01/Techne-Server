const bookshelf = require('../db/bookshelf');

require('./exercises');
require('./goals');

const Session = bookshelf.Model.extend({
  tableName: 'session',
  exercise: function () {
    return this.belongsToMany('Exercise').through('SessionExercise')
  },
  goal: function () {
    return this.belongsToMany('Goal').through('Session')

  }
});

module.exports = bookshelf.model('Session', Session);
