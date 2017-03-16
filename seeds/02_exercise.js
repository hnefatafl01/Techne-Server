
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('exercise').del()
  return knex.raw('DELETE FROM exercise; ALTER SEQUENCE exercise_id_seq restart with 4;')
    .then(function () {
      // Inserts seed entries
      return knex('exercise').insert([
        {id: 1, name: 'Bench Press', sets:5, repetitions: 5, load: 185 },
        {id: 2, name: 'Press', sets:5, repetitions: 5, load: 125},
        {id: 3, name: 'Back Squat', sets:5,  repetitions: 5, load: 325}
      ]);
    });
};
