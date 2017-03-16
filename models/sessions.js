const bookshelf = require('../db/bookshelf');

require('./exercises');
require('./goals');

const Sessions = bookshelf.Model.extend({
  tableName: 'session',
  goals: function () {
    return this.belongsTo('Goal')
  }
});

module.exports = bookshelf.model('Sessions', Sessions);
