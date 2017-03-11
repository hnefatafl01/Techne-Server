
exports.up = function(knex, Promise) {
  return knex.schema.createTable('goal', (table) => {
    table.increments();
    table.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('goal');
};
