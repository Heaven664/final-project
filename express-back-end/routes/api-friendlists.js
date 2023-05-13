const express = require('express');
const router = express.Router();

const friendListQueries = require('../db/queries/friendlists');

router.get('/', (req, res) => {
  friendListQueries
    .getAll()
    .then(friendlists => res.json(friendlists))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error reading friendlists', error: error.message });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  friendListQueries
    .getById(id)
    .then(friendlist => res.json(friendlist))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error reading friendlist', error: error.message });
    });
});

module.exports = router;