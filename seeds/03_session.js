
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('session').del()
  return knex.raw('DELETE FROM session; ALTER SEQUENCE session_id_seq restart with 2;')
    .then(function () {
      // Inserts seed entries
      return knex('session').insert([
        {id: 1, date: '03/15/2017', duration: 30, goal_id:2 },
        {id: 2, date: '03/16/2017', duration: 20, goal_id:1 },
        {id: 3, date: '03/17/2017', duration: 45, goal_id:3 },
        {id: 4, date: '03/18/2017', duration: 60, goal_id:2 },
        {id: 5, date: '03/19/2017', duration: 90, goal_id:2 }

      ]);
    });
};
