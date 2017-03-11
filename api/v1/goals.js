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
    res.json({ saved });
  })
})

router.get('/:id', (req, res) => {
  Goal.where('id', req.params.id).fetch()
    .then((goal)=> {
      res.json({ goal });
    })
})

router.put('/:id', (req,res) => {
  Goal.where('id', req.params.id).fetch()
    .then((goal)=> {
      goal.save({
        exercise_name: req.body.exercise_name,
        reps: req.body.reps,
        load: req.body.load,
        finish_date: req.body.finish_date
      }).then((updated)=>{
        console.log(updated);
        res.json({ updated });
      })
    })
})

router.delete('/:id', (req, res) => {
  Goal.where('id', req.params.id).destroy()
    .then((destroyed)=> {
      console.log(destroyed);
      res.json({ destroyed })
    })
})

module.exports = router;
