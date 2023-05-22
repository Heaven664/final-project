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
        e.id AS event_id,
        e.name AS event_name,
        e.event_date AS event_date,
        e.event_location AS event_location,
        h.first_name AS host_first_name,
        h.last_name AS host_last_name,
        h.photo AS host_photo
      FROM 
        events AS e
      LEFT JOIN 
        users AS h ON e.host_id = h.id
      WHERE 
        e.host_id = $1
        ORDER BY e.event_date ASC;
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
        e.id AS event_id,
        e.name AS event_name,
        e.event_date AS event_date,
        e.event_location AS event_location,
        h.first_name AS host_first_name,
        h.last_name AS host_last_name,
        h.photo AS host_photo
      FROM 
        events AS e
      LEFT JOIN 
        users AS h ON e.host_id = h.id
      INNER JOIN (
        SELECT 
          eu.event_id
        FROM 
          event_user AS eu
        WHERE 
          eu.user_id = $1
      ) AS subquery ON e.id = subquery.event_id
      LEFT JOIN 
        users AS u ON u.id = $1
      WHERE 
        e.host_id <> $1
      ORDER BY e.event_date ASC;
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
        e.id AS event_id,
        e.name AS event_name,
        e.event_date AS event_date,
        e.event_location AS event_location,
        h.first_name AS host_first_name,
        h.last_name AS host_last_name,
        h.photo AS host_photo
      FROM 
        events AS e
      LEFT JOIN 
        users AS h ON e.host_id = h.id
      LEFT JOIN (
        SELECT 
          eu.event_id,
          u.first_name,
          u.last_name,
          u.photo
        FROM 
          event_user AS eu
        INNER JOIN 
          users AS u ON eu.user_id = u.id
        WHERE 
          eu.user_id = $1
      ) AS u ON e.id = u.event_id
      WHERE 
        e.host_id = $1 AND 
        e.event_date < NOW()::timestamp
        ORDER BY e.event_date ASC;
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
        e.id AS event_id,
        e.name AS event_name,
        e.event_date AS event_date,
        e.event_location AS event_location,
        h.first_name AS host_first_name,
        h.last_name AS host_last_name,
        h.photo AS host_photo
      FROM 
        events AS e
      LEFT JOIN 
        users AS h ON e.host_id = h.id
      LEFT JOIN (
        SELECT 
          eu.event_id,
          u.first_name,
          u.last_name,
          u.photo
        FROM 
          event_user AS eu
        INNER JOIN 
          users AS u ON eu.user_id = u.id
        WHERE 
          eu.user_id = $1
      ) AS u ON e.id = u.event_id
      WHERE 
        e.host_id = $1 AND 
        e.event_date > NOW()::timestamp AND 
        e.event_date < (NOW() +INTERVAL '30 DAYS')::TIMESTAMP
        ORDER BY e.event_date ASC;
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
        e.id AS event_id,
        e.name AS event_name,
        e.event_date AS event_date,
        e.event_location AS event_location,
        h.first_name AS host_first_name,
        h.last_name AS host_last_name,
        h.photo AS host_photo
      FROM 
        events AS e
      LEFT JOIN 
        users AS h ON e.host_id = h.id
      LEFT JOIN (
        SELECT 
          eu.event_id,
          u.first_name,
          u.last_name,
          u.photo
        FROM 
          event_user AS eu
        INNER JOIN 
          users AS u ON eu.user_id = u.id
        WHERE 
          eu.user_id = $1
      ) AS u ON e.id = u.event_id
      WHERE 
        e.host_id = $1 OR u.event_id IS NOT NULL
        ORDER BY e.event_date ASC;
        `,
      [Number(request.params.id)])
      .then(res => {
        response.json(res.rows);
      })
      .catch(error => response.json({Error: error, Message:"Error getting event_user for this user."}));
    });

    //get all events list for user
    router.get("/gethost/:id", (request, response) => {
      db.query(
        `
        SELECT 
        e.id AS event_id,
        e.name AS event_name,
        e.description,
        e.agenda,
        e.event_date,
        e.event_location,
        h.id AS host_id,
        h.first_name AS host_first_name,
        h.last_name AS host_last_name,
        h.photo AS host_photo
      FROM 
        events AS e
      LEFT JOIN 
        users AS h ON e.host_id = h.id
      WHERE e.id = $1;
        `,
      [Number(request.params.id)])
      .then(res => {
        response.json(res.rows[0]);
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