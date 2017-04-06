exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM user_goal; ALTER SEQUENCE user_goal_id_seq restart with 2;')
    .then(function () {
      // Inserts seed entries
      return knex('user_goal').insert([
        {user_id: 1, goal_id: 1 }
      ]);
    });
};
