const express = require('express');
const Queries = require('./queries');
const knex = require('../../db/knex')
const Exercise = require('../../models').exercises;

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

router.put('/edit/:id', (req,res) => {
  let id = req.params.id;
  let session = req.body;

  Queries.Session.update(id, session)
    .then((result) => {
      res.json({ result })
    })
})

router.post('/:id/exercises', (req,res)=>{
  // console.log(req.body);
  Queries.Session.getOne(req.params.id)
  .then((session) => {
    // console.log(session.id);
    Queries.Exercise.insert(req.body)
      .then((exercise) => {
        // console.log(exercise.id);
        exercise.sessionId = session.id
        res.json({ exercise })
    })
  })
});


module.exports = router;
