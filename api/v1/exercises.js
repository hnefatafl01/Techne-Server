const express = require('express');
const Exercise = require('../../models').exercise;
const Queries = require('./queries');
const router = express.Router();

router.get('/', (req, res) => {
  Queries.Exercise.getAll()
    .then((exercise) => {
      res.json({ exercise });
    })
})

router.post('/', (req, res) => {
  Queries.Exercise.insert(req.body)
  .then((saved) => {
    res.json({ saved });
  })
})

router.get('/:id', (req,res) => {
  Queries.Exercise.getOne(req.params.id)
    .then((exercise) => {
      res.json({ exercise });
  })
})

router.put('/edit/:id', (req,res) => {
  Queries.Exercise.update(req.params.id, req.body)
    .then((updated) => {
      res.json({ updated });
    })
})


router.delete('/delete/:id', (req,res) => {
  Queries.Exercise.destroy(req.params.id)
    .then((destroyed) => {
      res.json({ destroyed })
    })
})

module.exports = router;
