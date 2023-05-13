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
      res.status(201).json({ message: 'Event created!', note });
      res.redirect('/');
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

      res.status(201).json({ message: 'Here is your event!', event });
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

  const { content } = req.body;
  if (!content) {
    return res
      .status(400)
      .json({ message: 'All properties must be provided to update a note' });
  }

  const { id } = req.params;
  notesQueries
    .getById(id)
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: 'Note not found!' });
      }

      console.log(note);
      const noteBelongsToUser = note.user_id === user_id;
      if (!noteBelongsToUser) {
        return res
          .status(401)
          .json({ message: 'Note does not belongs to you!' });
      }

      return notesQueries.update({ id, content });
    })
    .then((updatedNote) => {
      res.status(201).json({ message: 'Note updated!', note: updatedNote });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating note', error: err.message });
    });
});

// Delete - POST
router.post('/:id/delete', (req, res) => {
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(401).json({ message: 'User is not logged in' });
  }

  const { id } = req.params;
  notesQueries
    .getById(id)
    .then((note) => {
      if (!note) {
        return res.status(404).json({ message: 'Note not found!' });
      }

      const noteBelongsToUser = note.user_id === user_id;
      if (!noteBelongsToUser) {
        return res
          .status(401)
          .json({ message: 'Note does not belongs to you!' });
      }

      return notesQueries.remove(id);
    })
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error deleting note', error: err.message });
    });
});

module.exports = router;