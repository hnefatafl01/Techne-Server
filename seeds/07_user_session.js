exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM user_session; ALTER SEQUENCE user_session_id_seq restart with 2;')
    .then(function () {
      // Inserts seed entries
      return knex('user_session').insert([
        {user_id: 1, session_id: 1 },
        {user_id: 1, session_id: 2 },
        {user_id: 1, session_id: 3 },
        {user_id: 1, session_id: 4 },
        {user_id: 1, session_id: 5 }
      ]);
    });
};
