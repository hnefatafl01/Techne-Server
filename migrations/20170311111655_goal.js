
exports.up = function(knex, Promise) {
  return knex.schema.createTable('goal', (table) => {
    table.increments();
    table.string('exercise_name');
    table.integer('reps');
    table.integer('load');
    table.date('finish_date');
    // table.integer('session_id').unsigned().references('id').inTable('goal').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('goal');
};
