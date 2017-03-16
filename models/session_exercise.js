const bookshelf = require('../db/bookshelf');

const SessionExercise = bookshelf.Model.extend({
  tableName: 'Session_exercise',
  session: function(){
    return this.hasMany('Session');
  },
  exercise: function() {
    return this.hasMany('Exercise');
  }
})

module.exports = bookshelf.model('SessionExercise', SessionExercise);
