
exports.up = function(knex, Promise) {
  return knex.schema.createTable('session_exercise', (table) => {
    table.increments();
    table.integer('session_id').unsigned().references('id').inTable('session').onDelete('cascade');
    table.integer('exercise_id').unsigned().references('id').inTable('exercise').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('session_exercise');
};
