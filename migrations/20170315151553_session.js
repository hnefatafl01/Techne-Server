
exports.up = function(knex, Promise) {
  return knex.schema.createTable('session', (table) => {
    table.increments();
    table.date('date');
    table.integer('duration');
    table.integer('goal_id').unsigned().references('id').inTable('goal').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('session');
};
