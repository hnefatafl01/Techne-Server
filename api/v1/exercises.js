const express = require('express');
const knex = require('../../db/knex');
const Queries = require('./queries');
const Exercise = require('../../models').exercises;
const Session = require('../../models').sessions;
const router = express.Router({mergeParams: true});

router.get('/', (req,res) => {
  Queries.Session.getOne(req.params.id)
    .then((session) => {
      // console.log(session);
      res.json({ session })
    })
})

router.post('/', (req,res)=>{
    Queries.Exercise.insert(req.body)
      .then((exercise) => {
        return knex('session_exercise')
          .insert({
            session_id: req.params.id,
            exercise_id: exercise.id
          })
          .then(() => {
            res.json(exercise)
          })
    })
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let baseUrl = req.baseUrl;
  var numberString = baseUrl.replace( /\D/g, '');
  let sessionId = numberString[1];
  Queries.Exercise.destroy(sessionId, id)
    .then((result) => {
      res.json({result})
    })
})

// router.get('/:id', (req, res) => {
//   Queries.Session.getOne(req.params.id)
//     .then((session) => {
//       res.json( session )
//     })
// })

// router.put('/:id', (req,res)=>{
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



// router.get('/:id/exercises/:id', (req,res) => {
//   Queries.Session.getOne(req.params.id)
//     .then((session) => {
//       res.json({ session })
//     })
// })



// router.get('/', (req, res) => {
//   Queries.Exercise.getAll()
//     .then((exercise) => {
//       res.json({ exercise });
//     })
// })
//
// router.post('/', (req, res) => {
//   Queries.Exercise.insert(req.body)
//   .then((saved) => {
//     res.json({ saved });
//   })
// })
//
// router.get('/:id', (req,res) => {
//   Queries.Exercise.getOne(req.params.id)
//     .then((exercise) => {
//       res.json({ exercise });
//   })
// })
//
// router.put('/edit/:id', (req,res) => {
//   Queries.Exercise.update(req.params.id, req.body)
//     .then((updated) => {
//       res.json({ updated });
//     })
// })
//
// router.delete('/delete/:id', (req,res) => {
//   Queries.Exercise.destroy(req.params.id)
//     .then((destroyed) => {
//       res.json({ destroyed })
//     })
// })

module.exports = router;
