const express = require('express');
const Goal = require('../../models').goals;
const Queries = require('./queries');
const router = express.Router();


router.get('/', (req, res) => {
  Queries.Goal.getAll()
    .then((goals) => {
      res.json({ goals });
    })
});

router.post('/', (req, res) => {
  Queries.Goal.insert(req.body)
  .then((saved) => {
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
