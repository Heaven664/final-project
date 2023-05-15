const express = require('express');
const router = express.Router();

const gmsgQueries = require('../db/queries/group-messages');

// Create new user
router.post("/", (req, res) => {
  console.log(req.body);
  const { sender_id, event_id, text } = req.body;
  console.log(sender_id, event_id, text);

  gmsgQueries.create(sender_id, event_id, text)
    .then((message) => {
      res.json(message);
    })
    .catch(error => console.log(error));
});

// Get all users
router.get("/", (req, res) => {
  gmsgQueries.getAll()
    .then(messages => res.json(messages));
});

// Get one message
router.get("/:id", (req, res) => {
  const { id } = req.params;
  gmsgQueries.getById(id)
    .then(message => res.json(message));
});

// Delete message
router.delete("/:id/delete", (req, res) => {
  const { id } = req.params;
  gmsgQueries.remove(id)
    .then((message) => res.json({message: "Message was successfully deleted", deletedMessage: message}))

});

module.exports = router;