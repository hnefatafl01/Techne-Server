
exports.up = function(knex, Promise) {
  return knex.schema.createTable('goal', (table) => {
    table.increments();
    table.string('exercise_name');
    table.integer('reps');
    table.integer('load');
    table.dateTime('finish_date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('goal');
};
