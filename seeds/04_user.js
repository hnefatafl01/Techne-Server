
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('user').del()
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq restart with 2;')
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, username: 'Rufus', email: 'dog'}
      ]);
    });
};
