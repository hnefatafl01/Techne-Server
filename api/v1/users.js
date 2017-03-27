const express = require('express');
const Queries = require('./queries');
const knex = require('../../db/knex')
const router = express.Router();

router.get('/:id', (req,res)=>{
  return knex('user').select('*').where('id', req.params.id)
    .then((user) => {
      res.json({ user });
    })
})

router.get('/:id/sessions', (req,res) => {
  Queries.User.getUserSessions(req.params.id)
    .then((result) => {
      res.json({ result });
    })
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
          .then(() => {
            res.json(exercise)
          })
    })
});
//
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
