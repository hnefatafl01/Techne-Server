
exports.up = function(knex, Promise) {
  return knex.schema.createTable('exercise', (table)=> {
    table.increments();
    table.string('name');
    table.integer('sets');
    table.integer('repetitions');
    table.integer('load');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('exercise');
};
