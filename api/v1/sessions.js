const express = require('express');
const Queries = require('./queries');
// const Sessions = require('../../models').sessions;
const router = express.Router();

router.get('/', (req,res) => {
  Queries.Sessions.getAll()
    .then((sessions) => {
      res.json({ sessions })
    })
})

module.exports = router;
