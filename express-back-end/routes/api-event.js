const express = require('express');
const router = express.Router();

const eventQueries= require('../db/queries/events');

// //// CREATE
// router.post('/', (req, res) => {
//   // const { host_id } = req.session;
//   // if (!host_id) {
//   //   return res.status(401).json({ message: 'User is not logged in' });
//   // }

//   const { name, description, agenda, host_id, date, location } = req.body; 
//   // if (!name ) {
//   //   return res
//   //     .status(403)
//   //     .json({ message: 'Provide event name to open a new event!' });
//   // }
//   // if (!description) {
//   //   return res
//   //     .status(403)
//   //     .json({ message: 'Provide event description to open a new event!' });
//   // }
//   // if (!agenda) {
//   //   return res
//   //     .status(403)
//   //     .json({ message: 'Provide event agenda to open a new event!' });
//   // }

//   eventQueries
//     .create(name, description, agenda, host_id, date, location)
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

  const { name, description, agenda, date, location } = req.body;

  const id  = req.params.id;
  eventQueries
    .update(id, name, description, agenda, date, location )
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

      // const eventBelongsToUser = event.host_id === host_id;
      // if (!eventBelongsToUser) {
      //   return res
      //     .status(401)
      //     .json({ message: 'Event does not belongs to you!' });
      // }

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

// module.exports = router;


// const express = require('express');
// const router = express.Router();
const db = require('../db/connection');

  //CRUD CREATE(POST)
  router.post("/", (request, response) => {

    const { name, description, agenda,  date, location, host } = request.body;

    db.query(
      `
      INSERT INTO events (name, description, agenda, event_date, event_location, host_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
    [name, description, agenda, date, location, host])
    .then(res => {
      response.json(res.rows[0]);
    })
    .catch(error => response.json({Error: error, Message:"Error adding event."}));
  });

  // //CRUD READ(GET)
  // router.get("/", (request, response) => {
  //   db.query(
  //     `
  //     SELECT
  //       *
  //     FROM events;
  //     `
  //   )
  //   .then(({rows:events}) => {
  //     response.json(events);
  //   })
  //   .catch(error => response.json({Error: error, Message:"Error getting events."}));
  // });

  //get events info with for event
  router.get("/host/:id", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM events
      WHERE host_id = $1;
      `,
    [Number(request.params.id)])
    .then(res => {
      response.json(res.rows);
    })
    .catch(error => response.json({Error: error, Message:"Error getting events for this host."}));
  });





  // //CRUD UPDATE(PUT)
  router.put("/new", (request, response) => {
    const { eventID, host } = request.body;

    db.query(
      `
      UPDATE events
      SET host_id = $2
      WHERE id = $1
      RETURNING *;
      `,
      [eventID, host]
    )
    .then(res => {
      response.json(res.rows[0]);
    })
    .catch(error => response.json({Error: error, Message:"Error getting event_user for this event."}));
  });


  // //CRUD DELETE
  // router.delete("/", (request, response) => {
  //   const { id } = request.body;
  //   // if (process.env.TEST_ERROR) {
  //   //   setTimeout(() => response.status(500).json({}), 1000);
  //   //   return;
  //   // }
  //   db.query(
  //     `
  //     DELETE FROM event_user
  //     WHERE id = $1;
  //     `, 
  //     [id]
  //   )
  //   .then(() => {
  //     response.status(204).json();
  //   })
  //   .catch(error => response.json({Error: error, Message:"Error deleting the record."}));

  // });


 module.exports = router;