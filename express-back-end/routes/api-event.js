const express = require('express');
const router = express.Router();

const eventQueries= require('../db/queries/events');

///// CRUD
//// CREATE
router.post('/', (req, res) => {
  const { host_id } = req.session;
  if (!host_id) {
    return res.status(401).json({ message: 'User is not logged in' });
  }

  const { name, description, agenda } = req.body;
  if (!name || !description || !agenda) {
    return res
      .status(403)
      .render('error', { message: 'Provide event name, description, and agenda to new event!' });
  }

  const newEvent = { host_id, name, description, agenda };
  eventQueries
    .create(newEvent)
    .then((event) => {
      res.status(201).json({ event });
      // res.redirect('/:id');
    })
    .catch((err) => {
      res
        .status(500)
        .render('error', { message: `Error registering user: ${err.message}` });
    });
});

//// READ
router.get('/', (req, res) => {
  eventQueries
  .getAll()
  .then(events => res.send(events))
});

//// Read one - GET
router.get('/:id', (req, res) => {
  eventQueries
    .getById(req.params.id)
    .then((event) => {
      if (!event) {
        return res.status(400).json({ message: 'Event not found!' });
      }

      res.status(200).json({ event });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading event', error: err.message });
    });
});

//// Update - POST
router.post('/:id/edit', (req, res) => {
  const { host_id } = req.session;
  if (!host_id) {
    return res.status(401).json({ message: 'User is not logged in' });
  }

  const { name, description, agenda } = req.body;
  if (!name || !description || !agenda) {
    return res
      .status(400)
      .json({ message: 'All properties must be provided to update a event' });
  }

  const { id } = req.params;
  eventQueries
    .getById(id)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found!' });
      }

      console.log(event);
      const eventBelongsToUser = event.host_id === host_id;
      if (!eventBelongsToUser) {
        return res
          .status(401)
          .json({ message: 'Event does not belongs to you!' });
      }

      return eventQueries.update({ id, name, description, agenda });
    })
    .then((updatedEvent) => {
      res.status(201).json({ event: updatedEvent });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating event', error: err.message });
    });
});

// Delete - POST
router.post('/:id/delete', (req, res) => {
  const { host_id } = req.session;
  if (!host_id) {
    return res.status(401).json({ message: 'User is not logged in' });
  }

  const { id } = req.params;
  eventQueries
    .getById(id)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found!' });
      }

      const eventBelongsToUser = event.host_id === host_id;
      if (!eventBelongsToUser) {
        return res
          .status(401)
          .json({ message: 'Event does not belongs to you!' });
      }

      return eventQueries.remove(id);
    })
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error deleting event', error: err.message });
    });
});

module.exports = router;