const express = require('express');
const router = express.Router();
const db = require('../db/connection');

  //CRUD CREATE(POST)
  router.post("/", (request, response) => {
    const { amount, user, fundraiser, pay_method, pay_status } = request.body;

    db.query(
      `
      INSERT INTO fundraiser_user (user_id, fundraiser_id, amount, payment_method, payment_status) VALUES
      ($1, $2, $3, $4, $5);
      `,
      [user, fundraiser, amount, pay_method, pay_status ]
    )
    .then(res => {
      response.json(res.rows[0]);
    })
    .catch(error => response.json({Error: error, Message:"Error updating transaction through, try again later."}));
  });



  //CRUD READ(GET)
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM fundraiser_user;
      `
    )
    .then(res => {
      response.json(res.rows);
    })
    .catch(error => response.json({Error: error, Message:"Error getting event_user."}));
  });


  //CRUD READ(GET)
  router.get("/fundraiser/:id", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM fundraiser_user
      WHERE fundraiser_id = $1;
      `, [Number(request.params.id)]
    )
    .then(res => {
      response.json(res.rows);
    })
    .catch(error => response.json({Error: error, Message:"Error getting event_user."}));
  });


    //CRUD READ(GET)
    router.get("/user/:id", (request, response) => {
      db.query(
        `
        SELECT
          *
        FROM fundraiser_user
        WHERE user_id = $1;
        `, [Number(request.params.id)]
      )
      .then(res => {
        response.json(res.rows);
      })
      .catch(error => response.json({Error: error, Message:"Error getting event_user."}));
    });


  //CRUD UPDATE(PUT)
  router.put("/", (request, response) => {
    const { amount, user, id, pay_method, pay_status } = request.body;

    db.query(
      `
      UPDATE fundraiser_user
      SET amount = $2, 
          user_id = $3,
          payment_method = $4,
          payment_status = $5
      WHERE id = $1;
      `,
      [id, amount, user, pay_method, pay_status]
    )
    .then(res => {
      response.json(res.rows);
    })
    .catch(error => response.json({Error: error, Message:"Error updating transaction through, try again later."}));
  });


  // //CRUD DELETE
  // router.delete("/:id", (request, response) => {

  //   db.query(
  //     `
  //     DELETE FROM event_user
  //     WHERE id = $1;
  //     `, 
  //     [Number(request.params.id)]
  //   )
  //   .then(() => {
  //     response.status(204).json();
  //   })
  //   .catch(error => response.json({Error: error, Message:"Error deleting the record."}));

  // });


 module.exports = router;