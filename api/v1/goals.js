const express = require('express');
const Goal = require('../../models/goals');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('hitting route');
  // Goal
  //   .fetchAll()
  //   .then((goals) => {
  //     res.send('res with goals')
  //     // res.json({ goals: goals,
  //     //            message: "getting goals"
  //     // });
  //   })

});

module.exports = router;
