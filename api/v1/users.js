const express = require('express');
const Queries = require('./queries');
const knex = require('../../db/knex')
const jwtHelper = require('./auth/jwtHelper')
const sessions = require('./sessions')
const goals = require('./goals')
const router = express.Router();

router.use('/:id/goals', goals)
// router.use('/:id/sessions', sessions)

router.get('/:id', (req,res)=>{
  let token = req.headers.authorization.split('').splice(7).join('');
  let decoded = jwtHelper.decodeJWT(token);
  if(decoded) {
    let id = decoded.user.id
    return knex('user').select('*').where('id', req.params.id)
    .then((user) => {
      res.json({ user });
    })
  }
})

router.get('/:id/sessions', (req,res) => {
  let token = req.headers.authorization.split('').splice(7).join('');
  let decoded = jwtHelper.decodeJWT(token);
  if(decoded) {
    let id = decoded.user.id
    Queries.User.getUserSessions(id)
      .then((result) => {
        console.log(result.sessions);
        res.json({ result });
      })
  } else {
    res.status(401);
  }
})

router.post('/:id/sessions', (req,res) => {
    Queries.User.insert(req.body)
      .then((session) => {
        console.log(session.id);
        return knex('user_session')
          .insert({
            session_id: req.params.id,
            user_id: user.id
          })
          .then((result) => {
            res.json(result)
          })
    })
});





// router.get('/:id/exercises', (req,res) => {
//   Queries.Session.getOne(req.params.id)
//     .then((session) => {
//       res.json({ session })
//     })
// })

// router.put('/:id/exercises', (req,res)=>{
//     Queries.Session.update(req.body)
//       .then((exercise) => {
//         console.log(exercise.id);
//         return knex('session_exercise')
//           .insert({
//             session_id: req.params.id,
//             exercise_id: exercise.id
//           })
//           .then(() => {
//             res.json(exercise)
//           })
//     })
// });
module.exports = router;
