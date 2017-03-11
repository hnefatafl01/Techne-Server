'use strict';

const bookshelf = require('../db/bookshelf');

const Goal = bookshelf.Model.extend({
  tableName: 'goal'
});

module.exports = Goal;
