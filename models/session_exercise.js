const bookshelf = require('../db/bookshelf');

require('./exercises')
require('./sessions')
const SessionExercise = bookshelf.Model.extend({
  tableName: 'session_exercise',
  sessions: function() {
    return this.hasMany('Session')
  },
  exercises: function() {
    return this.hasMany('Exercise')
  }
})

module.exports = bookshelf.model('SessionExercise', SessionExercise);
