const knex = require('../../db/knex')
const Exercise = require('../../models').exercises;
const Goal = require('../../models').goals;
const GoalExercise = require('../../models').goal_exercise;
const Session = require('../../models').sessions;
const SessionExercise = require('../../models').session_exercise;
const Users = require('../../models').users;
const UserSession = require('../../models').user_session;

module.exports = {
  Exercise: {
    getAll: () => {
      return Exercise.forge().fetchAll( { withRelated: ['goal'] })
        .then((collection) => {
          return collection.toJSON();
        })
    },
    getOne: (id) => {
      return Exercise.where({ id: id }).fetch({ withRelated: ['goal'] })
        .then((collection) => {
          return collection.toJSON();
        })
    },
    insert: (data) => {
      return Exercise.forge(data).save()
        .then((collection) => {
          return collection.toJSON();
        })
    },
    // destroy: (id)=> {
    //   return Exercise.where('id', id).destroy()
    // },

    destroy: function (id, session_id) {
          if (session_id) {
            var ids = {
              exercise_id: id,
              session_id: session_id
            }
            return SessionExercise.where(ids).destroy();
          }
          return Exercise.where({id: id}).destroy()
            .then(function (message) {
              return SessionExercise.where({exercise_id: id}).destroy();
          });
        },

    update: (id, data) => {
      return Exercise.forge({ id: id }).fetch()
        .then((exercise) => {
          return exercise.save(data)
        })
    }
  },
  Goal: {
    getAll: () => {
      return Goal.forge().fetchAll({ withRelated: 'exercise' })
        .then((collection) => {
          return collection.toJSON();
        })
    },
    getOne: (id) => {
      return Goal.where({ id: id }).fetch({ withRelated: 'exercise' })
        .then((collection) => {
          return collection.toJSON();
        })
    },
    insert: (data) => {
      return Goal.forge(data).save()
        .then((collection) => {
          return collection.toJSON();
        })
    },
    destroy: (id)=> {
      return Goal.where('id', id).destroy()
    },


    update: (id, data) => {
      return Goal.forge({ id: id }).fetch()
        .then((goal) => {
          return goal.save(data)
        })
    }
  },
  Session: {
    getAll: () => {
      return Session.forge().fetchAll({ withRelated: ['user','exercises'] })
        .then((collection) => {
          return collection.toJSON();
        })
    },
    getOne: (id) => {
      return Session.where({ id: id }).fetch({ withRelated: ['user','exercises'] })
        .then((collection) => {
          return collection.toJSON();
        })
    },
    insert: (data) => {
      return Session.forge(data).save( null, { method: 'insert' })
        .then((collection) => {
          return collection.toJSON();
        })
    },
    update: (id, session) => {
      return Session.forge(session).save()
        .then((collection) => {
          return collection.toJSON();
        })
    },
  },
  SessionExercise: {
    insert: (data) => {
      return SessionExercise.forge().save()
    }
  },
  User: {
    getUserSessions: function(id) {
      return Users.where({ id: id }).fetchAll({ withRelated: ['sessions'] })
    },
    getUserGoals: function(id) {
      return Users.where({ id: id }).fetchAll( {withRelated: ['goals']})
    }
  }
}
