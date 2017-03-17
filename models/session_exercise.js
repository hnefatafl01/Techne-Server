const bookshelf = require('../db/bookshelf');

require('./exercises')
require('./sessions')
const SessionExercise = bookshelf.Model.extend({
  tableName: 'session_exercise',
  session: function(){
    return this.hasMany('Session');
  },
  exercise: function() {
    return this.hasMany('Exercise');
  }
})

module.exports = bookshelf.model('SessionExercise', SessionExercise);
