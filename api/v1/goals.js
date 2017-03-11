const express = require('express');
const Goal = require('../../models/goals');
const router = express.Router();

router.get('/', (req, res) => {
  Goal
    .fetchAll()
    .then((goals) => {
      res.json({ goals });
    })
});

router.post('/', (req, res) => {
  new Goal({
    exercise_name: req.body.exercise_name,
    reps: req.body.reps,
    load: req.body.load,
    finish_date: req.body.finish_date
  }).save()
  .then((saved) => {
    console.log(saved);
    res.json({ saved });
  })
})

module.exports = router;
