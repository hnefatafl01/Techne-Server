const express = require('express');
const knex = require('../../../db/knex')
const bcrypt = require('bcrypt');
const AuthQueries = require('./authQueries')
const jwt = require('jsonwebtoken')
const jwtHelper = require('./jwtHelper')
const router = express.Router();

function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim() != "";
  const validPassword = typeof user.password == 'string' && user.password.trim() != "";
  return validEmail && validPassword
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
            AuthQueries
              .createUser(user)
              .then((result) => {
                // console.log(result);
                let user = {
                  id: result[0].id,
                  username: result[0].username,
                  email: result[0].email
                }
                // console.log(user);
                var id_token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1h' })
                console.log(id_token);
                res.status(200).json({id_token})
              }).catch((err) => {
                  // console.log('invalid user');
                  res.send('Invalid user')
              })
        })
      }
    })
  } else {
    res.json({
      message: "Invalid password 🔐"
    })
    // console.log('invalid password');
  }
})

router.post('/signin', function(req,res,next) {
  // console.log(req.body);
  if(validUser(req.body)) {
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    AuthQueries.getUserByEmail(userEmail)
      .then(function(user) {
        // console.log(user.password);
        let compare = bcrypt.compareSync(userPassword, user.password)
        // console.log(compare);
        if(user) {
          console.log(user);
          var id_token = jwtHelper.createJWT(user)
          var id_token = jwt.sign({ user }, process.env.TOKEN_SECRET)
          console.log(id_token);
          res.status(200).json({id_token})
          console.log("🤞");
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
