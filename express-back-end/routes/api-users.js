const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

const userQueries = require('../db/queries/users');

// Create user
router.post('/', (req, res) => {
  // Get data from request
  const { first_name, last_name, email, password, country, city, birthday, photo, about } = req.body;
  // Hash password
  const hashed_password = bcrypt.hashSync(password, 10);
  // Create User
  userQueries
    .create(first_name, last_name, email, hashed_password, country, city, birthday, photo, about)
    .then((user) => res.json(user))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error creating user', error: error.message });
    });
});

// Read all users
router.get('/', (req, res) => {
  userQueries
    .getAll()
    .then(users => res.json(users))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error reading users', error: error.message });
    });
});

// Read one user
router.get('/:id', (req, res) => {
  userQueries
    .getById(req.params.id)
    .then(user => res.json(user))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error reading user', error: error.message });
    });
});

// Update user
router.patch('/:id/edit', (req, res) => {
  // Get data from request
  const { first_name, last_name, email, password, country, city, birthday, photo, about } = req.body;
  // Hash password
  const hashed_password = bcrypt.hashSync(password, 10);
  // Update user
  const id = req.params.id;
  userQueries
    .update(id, first_name, last_name, email, hashed_password, country, city, birthday, photo, about)
    .then(user => res.json(user))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'Error updating user', error: error.message });
    });
});


module.exports = router;