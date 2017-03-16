const Exercise = require('../../models').exercise;
const Goal = require('../../models').goals;
const GoalExercise = require('../../models').goal_exercise;
const Session = require('../../models').sessions;

module.exports = {
  Exercise: {
    getAll: () => {
      return Exercise.forge().fetchAll({ withRelated: 'goal' })
        .then((collection) => {
          return collection.toJSON();
        })
    },
    getOne: (id) => {
      return Exercise.where({ id: id }).fetch({ withRelated: 'goal' })
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
    destroy: (id)=> {
      return Exercise.where('id', id).destroy()
    },
    update: (id, data) => {
      return Exercise.forge({ id: id }).fetch()
        .then((exercise) => {
          console.log(exercise);
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
      console.log(id,data);
      return Goal.forge({ id: id }).fetch()
        .then((goal) => {
          return goal.save(data)
        })
    }
  },
  Session: {
    getAll: () => {
      return Session.forge().fetchAll({ withRelated: 'exercise' })
        .then((collection) => {
          return collection.toJSON();
        })
    }
  }

}
