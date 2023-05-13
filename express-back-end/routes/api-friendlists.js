const express = require('express');
const router = express.Router();

const friendListQueries = require('../db/queries/friendlists');

router.get('/', (req, res) => {
  friendListQueries
    .getAll()
    .then(friendlists => res.json(friendlists));
});

module.exports = router;