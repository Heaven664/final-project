const express = require('express');
const router = express.Router();

const eventUserQueries= require('../db/queries/eventUser');

//// Connect user and event
// router.post('/', (req, res) => {

//   const { user_id, event_id } = req.body; 

//   eventQueries
//     .create(name, description, agenda, host_id)
//     .then((event) => res.json( event ))
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: `Error registering event: ${err.message}` });
//     });
// });

//// READ
router.get('/', (req, res) => {
  eventQueries
  .getAll()
  .then(events => res.send(events))
  .catch(error => {
    res
      .status(500)
      .json({ message: 'Error reading events', error: error.message });
  });
});

//// Read one - GET
router.get('/:id', (req, res) => {
  eventQueries
    .getById(req.params.id)
    .then((event) => {
      if (!event) {
        return res.json('Event not found!');
      }
      return res.json(event);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading event', error: err.message });
    });
});

//// Update - POST
router.post('/:id/edit', (req, res) => {
  // const { host_id } = req.session;
  // if (!host_id) {
  //   return res.status(401).json({ message: 'User is not logged in' });
  // }

  const { name, description, agenda } = req.body;

  const id  = req.params.id;
  eventQueries
    .update(id, name, description, agenda)
    .then(event =>  res.json(event))
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating event', error: err.message });
    });
});

// Delete - POST
router.post('/:id/delete', (req, res) => {
  // const { host_id } = req.session;
  // if (!host_id) {
  //   return res.status(401).json({ message: 'User is not logged in' });
  // }

  const { id } = req.params;
  eventQueries
    .getById(id)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: 'Event not found!' });
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