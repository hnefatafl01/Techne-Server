const express = require('express');
const Queries = require('./queries');
const knex = require('../../db/knex');
const Exercise = require('../../models').exercises;
const Session = require('../../models').sessions;
const exercises = require('./exercises');
const router = express.Router({mergeParams: true});//

router.use('/:id/exercises', exercises);

router.get('/', (req,res) => {
  Queries.Session.getAll()
    .then((sessions) => {
      res.json({ sessions })
    })
})

router.post('/', (req, res) => {
  Queries.Session.insert(req.body)
    .then((session)=> {
      res.json({session});
    })
})

router.get('/:id', (req,res) => {
  Queries.Session.getOne(req.params.id)
    .then((session) => {
      res.json({ session });
    })
})

router.put('/edit/:id', (req,res) => {
  // let id = req.params.id;
  let session = req.body;
  let id = session.id;

  Queries.Session.update(id, session)
    .then((result) => {
      res.json({ result })
    })
})

module.exports = router;
