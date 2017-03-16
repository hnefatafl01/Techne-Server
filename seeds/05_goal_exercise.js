
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('goal_exercise').del()
  return knex.raw('DELETE FROM goal_exercise; ALTER SEQUENCE goal_exercise_id_seq restart with 2;')
    .then(function () {
      // Inserts seed entries
      return knex('goal_exercise').insert([
        {goal_id: 1, exercise_id: 2}
      ]);
    });
};
