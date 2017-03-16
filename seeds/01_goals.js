
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('goal').del()
  return knex.raw('DELETE FROM goal; ALTER SEQUENCE goal_id_seq restart with 4;')
    .then(function () {
      // Inserts seed entries
      return knex('goal').insert([
        {id: 1, exercise_name: 'Bench Press', reps: 5, load: 185, finish_date: "08/1/2017"},
        {id: 2, exercise_name: 'Press', reps: 5, load: 125, finish_date: "08/1/2017"},
        {id: 3, exercise_name: 'Back Squat', reps: 5, load: 325, finish_date: "08/1/2017"}
      ]);
    });
};
