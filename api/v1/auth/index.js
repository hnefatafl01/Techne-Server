const express = require('express');
const knex = require('../../../db/knex')
const bcrypt = require('bcrypt');
const authQueries = require('./authQueries')
const jwt = require('jsonwebtoken')
const router = express.Router();

function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim() != "";
  const validPassword = typeof user.password == 'string' && user.password.trim() != "";
  if(validEmail && validPassword) {
    return true
  }
}

router.post('/signup', (req,res,next) => {
  // console.log(req.body);
  if(validUser(req.body)) {
    return knex('user').where('email', req.body.email).first()
    .then((user) => {
      if(!user) {
        bcrypt.hash(req.body.password, 10).then(function(hash) {
           var user = {
            username: req.body.username,
            email: req.body.email,
            password: hash
          }
          return user
        })
        .then((user) => {
            authQueries
              .createUser(user)
              .then((result) => {
                res.json(result)
              }).catch((err) => {
                  console.log('invalid user');
                  res.send('Invalid user')
              })
        })
      }
    })
  } else {
    // res.json({
    //   message: "Invalid password 🔐"
    // })
    console.log('invalid password');
  }
})

router.post('/signin', function(req,res,next) {
  if(validUser(req.body)){
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    authQueries
      .getUserByEmail(userEmail)
      .then(function(result) {
        if(bcrypt.compareSync(userPassword, result.password)) {
          var myToken = jwt.sign({ email: result.email }, process.env.TOKEN_SECRET)
          res.status(200).json(
            {myToken}
              // {
              //   results: result,
              //   message: '🔓'
              // }
            )
        } else {
          res.json({
            message: "Invalid password 🔐"
          })
        }
      })
  }
})


// router.get('/', (req, res) => {
//   console.log(req.body);
//   return knex('user').select().returning('*')
//   .then((users)=>{
//     console.log(users);
//     res.json(users)
//   })
// });
//
// router.post('/', (req, res) => {
//   console.log(req.body);
//   const password = req.body.password
//   const saltRounds = 10
//   console.log(password);
//   console.log(saltRounds);
//   let user =  {
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(password, saltRounds)
//   }
//   console.log(user);
//
//   // return knex('user').insert(user)
//   // .then((saved) => {
//   //   res.json(saved);
//   // })
// })
// //
// router.get('/:id', (req, res) => {
//   Queries.Goal.getOne(req.params.id)
//     .then((goal)=> {
//       res.json({ goal });
//     })
// })

// router.put('/edit/:id', (req,res) => {
//   Queries.Goal.update(req.params.id, req.body)
//     .then((updated) => {
//       res.json({ updated });
//     })
// })
//
// router.delete('/delete/:id', (req, res) => {
//   Queries.Goal.destroy(req.params.id)
//     .then((destroyed)=> {
//       res.json({ destroyed })
//     })
// })

module.exports = router;
