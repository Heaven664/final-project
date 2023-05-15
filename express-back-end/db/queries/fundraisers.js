const db = require('../connection');

const create = (event_id, target_amount) => {
  const queryString = `
  INSERT INTO fundraisers (event_id, target_amount)
  VALUES ($1, $2)
  RETURNING *;
  `;
  const values = [event_id, target_amount];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const getAll = () => {
  const queryString = `SELECT * FROM fundraisers`;
  return db.query(queryString)
    .then(res => res.rows);
};

const getById = (id) => {
  const queryString = `SELECT * FROM fundraisers WHERE id = $1`;
  const values = [id];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const update = (event_id, target_amount, current_amount) => {
  const queryString = `
  UPDATE fundraisers
  SET target_amount = $2, current_amount = $3
  WHERE event_id = $1
  RETURNING *;`;
  const values = [event_id, target_amount, current_amount];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const remove = (id) => {
  const queryString = `DELETE FROM fundraisers WHERE id = $1 RETURNING *`;
  const values = [id]
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};



module.exports = { create, getAll, getById, update, remove };