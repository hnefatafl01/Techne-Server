
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('session').del()
  return knex.raw('DELETE FROM session; ALTER SEQUENCE session_id_seq restart with 2;')
    .then(function () {
      // Inserts seed entries
      return knex('session').insert([
        {id: 1, date: '03/15/2017', duration: 30, goal_id:2 }

      ]);
    });
};