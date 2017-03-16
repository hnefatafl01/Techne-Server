
exports.up = function(knex, Promise) {
  return knex.schema.createTable('goal_exercise', (table) => {
    table.increments();
    table.integer('goal_id').unsigned().references('id').inTable('goal').onDelete('cascade');
    table.integer('exercise_id').unsigned().references('id').inTable('exercise').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('goal_exercise');
};
