const express = require('express');
const router = express.Router();

const getAllUsers = require('../db/queries/users')

router.get('/users', (req, res) => {
  getAllUsers()
  .then(users => res.send(users))
});

module.exports = router;