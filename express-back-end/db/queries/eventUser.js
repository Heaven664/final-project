const db = require('../connection');

// CRUD - Create, Read, Update, Delete
const create = (user_id, event_id) => {
  const queryString = `INSERT INTO event_user (user_id, event_id) VALUES ($1, $2) RETURNING *;`;
  const values = [user_id, event_id];
  return db.query(queryString, values)
    .then((data) => data.rows[0]);
};

const getAll = () => {
  return db.query('SELECT * FROM event_user ORDER BY id;').then((data) => data.rows);
};

const getById = (id) => {
  return db
    .query('SELECT * FROM event_user WHERE id = $1;', [id])
    .then((data) => data.rows[0]);
};

const getByHostId = (host_id) => {
  return db
    .query('SELECT * FROM event_user WHERE host_id = $1;', [host_id])
    .then((data) => data.rows);
};

const update = (id, name, description, agenda) => {
  const queryString = `
  UPDATE event_user 
  SET name = $2, 
      description = $3, 
      agenda = $4 
  WHERE id = $1 
  RETURNING *;`;
  const values = [id, name, description, agenda];
  console.log("update: ", values);
  return db.query(queryString, values)
    .then((data) => data.rows[0]);
};

const remove = (id) => {
  return db
    .query('DELETE FROM event_user WHERE id = $1;', [id])
    .then((data) => data.rows);
};

module.exports = { create, getAll, getById, getByHostId, update, remove };