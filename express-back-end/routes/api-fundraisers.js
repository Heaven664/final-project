const express = require('express');
const router = express.Router();
const fundraisersQueries = require('../db/queries/fundraisers');


// Create new fundraiser
router.post("/", (req, res) => {
  const { event_id, target } = req.body;

  fundraisersQueries.create(event_id, target)
    .then(fundraiser => {
      res.json(fundraiser);
    })
    .catch(error => console.log(error));
});

// Get all fundraisers
router.get("/", (req, res) => {
  fundraisersQueries.getAll()
    .then((fundraisers) => res.json(fundraisers));
});

// Get one fundraiser
router.get("/:id", (req, res) => {
  const { id } = req.params;
  fundraisersQueries.getById(id)
    .then(fundraiser => res.json(fundraiser));
});

// Update fundraiser
router.put("/:id", (req, res) => {
  const { event_id, target, current } = req.body;
  fundraisersQueries.update(event_id, target, current)
    .then(fundraiser => res.json(fundraiser))
    .catch(error => console.log(error));
});

// Delete fundraiser
router.delete("/:id/delete", (req, res) => {
  const { id } = req.params;
  fundraisersQueries.remove(id)
    .then((message) => res.json({message: "Fundraiser was successfully deleted", deletedMessage: message}))
});

module.exports = router;
