const bookshelf = require('../db/bookshelf');

// require('./exercises');
require('./goals');

const Sessions = bookshelf.Model.extend({
  tableName: 'session',
  goals: function () {
    return this.hasMany('Goal')
  }
  // ,
  // exercise: function() {
  //   return this.hasMany('Exercise')
  //   .through('SessionExercise')
  // }
});

module.exports = bookshelf.model('Sessions', Sessions);
