const express = require('express');
const Exercise = require('../../models/exercises');
const router = express.Router();

router.get('/', (req, res) => {
  Exercise.fetchAll()
    .then((exercise) => {
      res.json({ exercise });
    })
})

router.post('/', (req, res) => {
  new Exercise({
    name: req.body.name,
    sets: req.body.sets,
    repetitions: req.body.repetitions,
    load: req.body.load
  }).save()
  .then((saved) => {
    res.json({ saved });
  })
})

router.get('/:id', (req,res) => {
  Exercise
    .where('id', req.params.id)
    .fetch()
    .then((exercise) => {
      res.json({ exercise });
  })
})

router.put('/:id', (req,res) => {
  Exercise
    .where('id', req.params.id)
    .fetch()
    .then((exercise) => {
      exercise.save({
        name: req.body.name,
        sets: req.body.sets,
        repetitions: req.body.repetitions,
        load: req.body.load
      })
      .then((updated) => {
        console.log(updated);
        res.json({ updated });
      })
    })
})

router.delete('/:id', (req,res) => {
  Exercise
    .where('id', req.params.id)
    .destroy()
    .then((destroyed) => {
      res.json({ destroyed })
    })
})

module.exports = router;
