exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_session', (table) => {
    table.increments();
    table.integer('user_id').unsigned().references('id').inTable('user').onDelete('cascade');
    table.integer('session_id').unsigned().references('id').inTable('session').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_session');
};
