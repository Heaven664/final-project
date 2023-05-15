const router = require("express").Router();

module.exports = db => {

  //CRUD CREATE(POST)
  router.post("/event-guest/:id", (request, response) => {

    const { target } = request.body;

    db.query(
      `
      INSERT INTO fundraisers (event_id, target_amount, current_amount)
      VALUES ($1, $2, $3);
      `,
    [Number(request.params.id), target, "0"])
    .then(({ rows: fundraisers }) => {
      response.json(fundraisers);
    })
    .catch(error => console.log(error));
  });

  //CRUD READ(GET)
  router.get("/event-guest/", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM events
      LEFT JOIN event_user ON events.id = event_id
      `
    )
    .then(({ rows }) => {
      response.json(rows);
    });
  });

  router.get("/event-guest/:id", (request, response) => {
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
  router.put("/fundraisers/:id", (request, response) => {
  if (process.env.TEST_ERROR) {
    setTimeout(() => response.status(500).json({}), 1000);
    return;
  }

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

  return router;
  };