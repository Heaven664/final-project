const express = require('express');
const router = express.Router();
const db = require('../db/connection');

  //CRUD CREATE(POST)
  router.post("/", (request, response) => {

    const { event, user } = request.body;

    db.query(
      `
      INSERT INTO event_user (event_id, user_id)
      VALUES ($1, $2)
      RETURNING *;
      `,
    [event, user])
    .then(res => {
      response.json(res.rows[0]);
    })
    .catch(error => response.json({Error: error, Message:"Error adding user to event."}));
  });

  //CRUD READ(GET)
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM event_user;
      `
    )
    .then(({rows:group_messages}) => {
      response.json(group_messages);
    })
    .catch(error => response.json({Error: error, Message:"Error getting event_user."}));
  });

  //get guest lists with guest info for event
  router.get("/event/:id", (request, response) => {
    db.query(
      `
      SELECT
      *, event_user.id as event_user_id
      FROM event_user
      INNER JOIN users ON user_id = users.id
      WHERE event_id = $1;
      `,
    [Number(request.params.id)])
    .then(res => {
      response.json(res.rows);
    })
    .catch(error => response.json({Error: error, Message:"Error getting event_user for this event."}));
  });

  //get guest lists with guest info for event
  router.get("/user/:id", (request, response) => {
    db.query(
      `
      SELECT
      *, event_user.id as event_user_id
      FROM event_user
      INNER JOIN users ON user_id = users.id
      INNER JOIN events ON events.id = event_id
      WHERE user_id = $1
      ORDER BY event_date ASC;
      `,
    [Number(request.params.id)])
    .then(res => {
      response.json(res.rows);
    })
    .catch(error => response.json({Error: error, Message:"Error getting event_user for this user."}));
  });


    //get events list with user as the host
    router.get("/host/:id", (request, response) => {
      db.query(
        `
        SELECT
        name, event_date, users.photo, users.first_name, users.last_name, events.id
        FROM events
        INNER JOIN users ON host_id = users.id
        WHERE host_id = $1
        ORDER BY event_date ASC;
        `,
      [Number(request.params.id)])
      .then(res => {
        response.json(res.rows);
      })
      .catch(error => response.json({Error: error, Message:"Error getting event_user for this user."}));
    });

    //get events list with user as a guest
    router.get("/attend/:id", (request, response) => {
      db.query(
        `
        SELECT
        name, event_date, users.photo, users.first_name, users.last_name, events.id
        FROM events
        INNER JOIN event_user ON events.id = event_id
        INNER JOIN users ON user_id = users.id
        WHERE user_id = $1 AND host_id != $1
        ORDER BY event_date ASC;
        `,
      [Number(request.params.id)])
      .then(res => {
        response.json(res.rows);
      })
      .catch(error => response.json({Error: error, Message:"Error getting event_user for this user."}));
    });

    //get passed events list for user
    router.get("/history/:id", (request, response) => {
      db.query(
        `
        SELECT
        name, event_date, users.photo, users.first_name, users.last_name, events.id
        FROM events
        INNER JOIN event_user ON events.id = event_id
        INNER JOIN users ON user_id = users.id
        WHERE user_id = $1 AND host_id != $1 AND event_date < NOW()::timestamp
        UNION ALL
        SELECT
        name, event_date, users.photo, users.first_name, users.last_name, events.id
        FROM events
        INNER JOIN users ON host_id = users.id
        WHERE host_id = $1 AND event_date < NOW()::timestamp
        ORDER BY event_date ASC;
        `,
      [Number(request.params.id)])
      .then(res => {
        response.json(res.rows);
      })
      .catch(error => response.json({Error: error, Message:"Error getting event_user for this user."}));
    });


    //get upcoming events list for user
    router.get("/upcoming/:id", (request, response) => {
      db.query(
        `
        SELECT
        name, event_date, users.photo, users.first_name, users.last_name, events.id
        FROM events
        INNER JOIN event_user ON events.id = event_id
        INNER JOIN users ON user_id = users.id
        WHERE user_id = $1 AND host_id != $1 AND 
        event_date > NOW()::timestamp AND 
        event_date < (NOW() +INTERVAL '30 DAYS')::TIMESTAMP
        UNION ALL
        SELECT
        name, event_date, users.photo, users.first_name, users.last_name, events.id
        FROM events
        INNER JOIN users ON host_id = users.id
        WHERE host_id = $1 AND 
        event_date > NOW()::timestamp AND 
        event_date < (NOW() +INTERVAL '30 DAYS')::TIMESTAMP
        ORDER BY event_date ASC;
        `,
      [Number(request.params.id)])
      .then(res => {
        response.json(res.rows);
      })
      .catch(error => response.json({Error: error, Message:"Error getting event_user for this user."}));
    });


    //get all events list for user
    router.get("/all/:id", (request, response) => {
      db.query(
        `
        SELECT
        name, event_date, users.photo, users.first_name, users.last_name, events.id
        FROM events
        INNER JOIN event_user ON events.id = event_id
        INNER JOIN users ON user_id = users.id
        WHERE user_id = $1 AND host_id != $1
        UNION ALL
        SELECT
        name, event_date, users.photo, users.first_name, users.last_name, events.id
        FROM events
        INNER JOIN users ON host_id = users.id
        WHERE host_id = $1
        ORDER BY event_date ASC;
        `,
      [Number(request.params.id)])
      .then(res => {
        response.json(res.rows);
      })
      .catch(error => response.json({Error: error, Message:"Error getting event_user for this user."}));
    });






  //CRUD UPDATE(PUT)
  router.put("/", (request, response) => {
    const { event, user, id } = request.body;

    db.query(
      `
      UPDATE event_user
      SET event_id = $2, 
          user_id = $3
      WHERE id = $1;
      `,
      [id, event, user]
    )
    .then(res => {
      response.json(res.rows);
    })
    .catch(error => response.json({Error: error, Message:"Error getting event_user for this event."}));
  });


  //CRUD DELETE
  router.delete("/:id", (request, response) => {

    db.query(
      `
      DELETE FROM event_user
      WHERE id = $1;
      `, 
      [Number(request.params.id)]
    )
    .then(() => {
      response.status(204).json();
    })
    .catch(error => response.json({Error: error, Message:"Error deleting the record."}));

  });


 module.exports = router;