const express = require('express');
const router = express.Router();
const eventUserQueries= require('../db/queries/eventUser');

//// READ
router.get('/', (req, res) => {
  eventUserQueries
  .getAll()
  .then(eventUser => res.send(eventUser))
  .catch(error => {
    res
      .status(500)
      .json({ message: 'Error reading events', error: error.message });
  });
});

module.exports = router;