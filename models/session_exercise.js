const bookshelf = require('../db/bookshelf');
require('./exercises')
require('./sessions')

const SessionExercise = bookshelf.Model.extend({
  tableName: 'session_exercise',
  sessions: function() {
    return this.hasMany('Session', 'session_id')
  },
  exercises: function() {
    return this.hasMany('Exercise', 'exercise_id')
  }
})

module.exports = bookshelf.model('SessionExercise', SessionExercise);
