const db = require('../connection');

const create = (event_id, target_amount, title) => {
  const queryString = `
  INSERT INTO fundraisers (event_id, target_amount, title)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [event_id, target_amount, title];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const getAll = () => {
  const queryString = `SELECT * FROM fundraisers`;
  return db.query(queryString)
    .then(res => res.rows);
};

const getById = (id) => {
  const queryString = `SELECT * FROM fundraisers WHERE event_id = $1`;
  const values = [id];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const update = (id, target_amount, title) => {
  const queryString = `
  UPDATE fundraisers
  SET target_amount = $2, title = $3
  WHERE id = $1
  RETURNING *;`;
  const values = [id, target_amount, title];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const updateCurr = (id) => {
  const queryString = `
  UPDATE fundraisers
  SET current_amount = (
    SELECT SUM(amount)
    FROM fundraiser_user
    WHERE fundraiser_id = $1 
    AND payment_status = 'Completed'
  ) 
  WHERE id = $1
  RETURNING *;`;
  const values = [id];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const remove = (id) => {
  const queryString = `DELETE FROM fundraisers WHERE id = $1 RETURNING *`;
  const values = [id]
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};



module.exports = { create, getAll, getById, update, remove, updateCurr };