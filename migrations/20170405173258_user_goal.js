exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_goal', (table) => {
    table.increments();
    table.integer('user_id').unsigned().references('id').inTable('user').onDelete('cascade');
    table.integer('goal_id').unsigned().references('id').inTable('goal').onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_goal');
};
