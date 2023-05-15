const db = require('../connection');

const create = (sender_id, event_id, text) => {
  const queryString = `
  INSERT INTO group_messages (sender_id, event_id, text)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [sender_id, event_id, text];

  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const getAll = () => {
  const queryString = `SELECT * FROM group_messages`;

  return db.query(queryString)
    .then(res => res.rows);
};


const getById = (id) => {
  const queryString = `SELECT * FROM group_messages WHERE id = $1`;
  const values = [id]
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const remove = (id) => {
  const queryString = `DELETE FROM group_messages WHERE id = $1 RETURNING *`;
  const values = [id]
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

module.exports = { create, getAll, getById, remove };