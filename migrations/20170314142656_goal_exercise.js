
exports.up = function(knex, Promise) {
  return knex.schema.createTable('goal_exercise', (table) => {
    table.integer('goal_id').references('goal.id');
    table.integer('exercise_id').references('exercise.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('goal_exercise');
};
