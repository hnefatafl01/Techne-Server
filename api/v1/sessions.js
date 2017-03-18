const express = require('express');
const Queries = require('./queries');

const router = express.Router();

router.get('/', (req,res) => {
  Queries.Session.getAll()
    .then((sessions) => {
      res.json({ sessions })
    })
})

router.post('/', (req, res) => {
  Queries.Session.insert(req.body)
    .then((session)=>{
      res.json({ session });
    })
})

router.get('/:id', (req,res)=>{
  Queries.Session.getOne(req.params.id)
    .then((session) => {
      res.json({ session });
    })
})

module.exports = router;
