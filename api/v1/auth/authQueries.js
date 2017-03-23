const knex = require('../../../db/knex')

module.exports = {
  getUserByEmail: function(email) {
    return knex('user').where('email', email).first();
  },
  createUser: function(user) {
    return knex('user').returning('*').insert(user);
  },
  getSessions: function() {
    return knex('session').select();
  },
  getSessionById: function(id) {
    return knex('session').select().where('id', id);
  },
  addSession: function(session) {
    return knex('session')
      .insert(session, 'id')
      .then(function(id) {
        return id[0];
      })
  },
  updateSession: function(body, id) {
    return knex('session')
    .returning('*')
    .update(body)
    .where('id', id)
  },
  deleteSession: function(id) {
    return knex('session').where('id',id).del()
  }
}
