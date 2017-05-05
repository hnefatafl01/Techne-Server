const express = require('express');
// const Goal = require('../../models').goals;
// const User = require('../../models').users;
const Queries = require('./queries');
const jwtHelper = require('./auth/jwtHelper')
const router = express.Router({mergeParams: true});


router.get('/', (req, res) => {
  let jwt = req.headers.authorization.split('').splice(7).join('');
  var decoded = jwtHelper.decodeJWT(jwt);
  // console.log("decode tokens for goals" + decoded.user);
  decoded = decoded.user;
  if(decoded) {
    let id = decoded.id
    Queries.User.getUserGoals(id)
      .then((UserGoals) => {
        res.json({ UserGoals });
      })
  }
});

router.post('/', (req, res) => {
  let goal = {
    exercise_name: req.body.exercise,
    reps: req.body.repetitions,
    load: req.body.load,
    finish_date: req.body.goalFinishDate
  }
  // console.log(goal);
  Queries.Goal.insert(goal)
  .then((saved) => {
    console.log(saved);
    res.json({ saved });
  })
})

router.get('/:id', (req, res) => {
  Queries.Goal.getOne(req.params.id)
    .then((goal)=> {
      res.json({ goal });
    })
})

router.put('/edit/:id', (req,res) => {
  Queries.Goal.update(req.params.id, req.body)
    .then((updated) => {
      res.json({ updated });
    })
})

router.delete('/delete/:id', (req, res) => {
  Queries.Goal.destroy(req.params.id)
    .then((destroyed)=> {
      res.json({ destroyed })
    })
})

module.exports = router;
