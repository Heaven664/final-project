const express = require('express');
const router = express.Router();
const db = require('../db/connection');

  //CRUD CREATE(POST)
  router.post("/", (request, response) => {

    const { event, user } = request.body;

    db.query(
      `
      INSERT INTO event_user (event_id, user_id)
      VALUES ($1, $2);
      `,
    [event, user])
    .then(({ rows }) => {
      response.json(rows);
    })
    .catch(error => console.log(error, "Error adding user to event."));
  });

  //CRUD READ(GET)
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM event_user
      `
    )
    .then(({ rows }) => {
      response.json(rows);
    });
  });

  router.get("/:id", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM events
      INNER JOIN event_user ON events.id = event_id
      INNER JOIN users ON user_id = users.id
      WHERE event_id = $1
      `,
    [Number(request.params.id)])
    .then(({ rows }) => {
      response.json(rows);
    });
  });

  //CRUD UPDATE(PUT)
  router.put("/", (request, response) => {

  const { target, current } = request.body;

  db.query(
    `
    UPDATE fundraisers
    SET target_amount = $2, current_amount = $3
    WHERE event_id = $1;
  `,
  [Number(request.params.id), target, current])

    .then(({ rows: fundraisers }) => {
      response.json(fundraisers);
    })
    .catch(error => console.log(error));
});


  //CRUD DELETE
  router.delete("/fundraisers/:id", (request, response) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    db.query(`DELETE FROM fundraisers WHERE event_id = $1::integer;`, 
            [request.params.id])
            .then(() => {
            setTimeout(() => {
              response.status(204).json({});
            }, 1000);
          });
  });


 module.exports = router;