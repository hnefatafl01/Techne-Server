var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
var knex = require('knex')(config);
var Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('registry');
module.exports = Bookshelf;
