const express = require('express');
const router = express.Router();

const friendListQueries = require('../db/queries/friendlists');

// Create friendlist
router.post('/', async (req, res) => {
  const { user_id, friend_id } = req.body;

  // Since both users should have their own friendlist, the function creates two friendlist entities 
  try {
    // Create friendlist for a user with user_id
    const firstFriendlist = await friendListQueries.create(user_id, friend_id);
    try {
      // Create friendlist for a user with friend_id
      const secondFriendlist = await friendListQueries.create(friend_id, user_id);
      res.json([firstFriendlist, secondFriendlist]);
    } catch (err) {
      res.status(500).json({ message: 'Error creating second friendlist', err: err.message });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating first friendlist', error: err.message });
  }
});

// Get all friendlists
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

// Get one friendlist
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

// Delete friendlist
router.delete('/:id/delete', async (req, res) => {
  const { id } = req.params;

  // Since both users have their own friendlist, the function deletes two friendlist entities 
  try {
    // Deletes friendlist for a user with user_id
    const { user_id, friend_id } = await friendListQueries.remove(id);
    try {
      // Gets id of the friendlist of the user with friend_id
      const secondFriendlistId = await friendListQueries.findByUsers(friend_id, user_id);
      // Deletes friendlist for a user with friend_id
      await friendListQueries.remove(secondFriendlistId);
      res.json("Both friendlist were deleted");
    } catch (err) {
      res.status(500).json({ message: 'Error deleting second friendlist', err: err.message });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting first friendlist', error: err.message });
  }
});

module.exports = router;