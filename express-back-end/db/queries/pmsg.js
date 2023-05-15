const db = require('../connection');

const create = (sender_id, receiver_id, text) => {
  const queryString = `
  INSERT INTO private_messages (sender_id, receiver_id, text)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  const values = [sender_id, receiver_id, text];

  return db.query(queryString, values)
    .then(res => res.rows[0])
};

module.exports = { create };