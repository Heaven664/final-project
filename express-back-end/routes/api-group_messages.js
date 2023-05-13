const router = require("express").Router();

module.exports = db => {

  //CRUD CREATE(POST)
  router.post("/gmsg/:id", (request, response) => {

    const { sender, text } = request.body;

    db.query(
      `
      INSERT INTO group_messages (sender_id, event_id, text)
      VALUES ($1, $2, $3);
      `,
    [sender, Number(request.params.id), text])
    .then(({rows:group_messages}) => {
      response.json(group_messages);
    })
    .catch(error => console.log(error));
  });

  //CRUD READ(GET)
  router.get("/gmsg/:id", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM group_messages
      WHERE event_id = $1;
    `,
    [Number(request.params.id)])
    .then(({rows:group_messages}) => {
      response.json(group_messages);
    });
  });


  //CRUD UPDATE(PUT)
  router.put("/gmsg/:id", (request, response) => {
  if (process.env.TEST_ERROR) {
    setTimeout(() => response.status(500).json({}), 1000);
    return;
  }

  const { sender, old_text, new_text } = request.body;

  db.query(
    `
    UPDATE group_messages
    SET sender_id = $2, text = $4
    WHERE event_id = $1 AND sender_id = $2 AND text = $3;
  `,
  [Number(request.params.id), sender, old_text, new_text])
    // .then(() => {
    //   setTimeout(() => {
    //     response.status(204).json({});
    //     // updateAppointment(Number(request.params.id), request.body.interview);
    //   }, 1000);
    // })
    .then(({rows:group_messages}) => {
      response.json(group_messages);
    })
    .catch(error => console.log(error));
});


  //CRUD DELETE
  router.delete("/gmsg/:id", (request, response) => {

    const { sender, text } = request.body;

    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    db.query(`
              DELETE FROM group_messages 
              WHERE event_id = $1 AND sender_id = $2 AND text = $3;
              `, 
            [Number(request.params.id), sender, text])
            .then(() => {
            setTimeout(() => {
              response.status(204).json({});
              // updateAppointment(Number(request.params.id), null);
            }, 1000);
          });
  });

  return router;
  };
