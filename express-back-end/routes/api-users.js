const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById } = require('../db/queries/users');

router.get('/', (req, res) => {
  getAllUsers()
    .then(users => res.json(users))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error reading users', error: error.message });
    });
});

router.get('/:id', (req, res) => {
  getUserById(req.params.id)
    .then(user => res.send(user))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error reading user', error: error.message });
    });
});

module.exports = router;