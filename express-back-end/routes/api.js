const express = require('express');
const router = express.Router();

const getAllUsers = require('../db/queries/users')

router.get('/users', (req, res) => {
  res.send(getAllUsers())
});

module.exports = router;