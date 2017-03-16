
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM session_exercise; ALTER SEQUENCE session_exercise_id_seq restart with 2;')
    .then(function () {
      // Inserts seed entries
      return knex('session_exercise').insert([
        {session_id: 1, exercise_id: 1, }
      ]);
    });
};
