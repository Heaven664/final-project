const express = require('express');
const router = express.Router();

const getAllEvents = require('../db/queries/events')

// CRUD api/users
router.get('/events', (req, res) => {
  getAllEvents()
  .then(events => res.send(events))
});

module.exports = router;