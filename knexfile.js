const dotenv = require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/techne'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
