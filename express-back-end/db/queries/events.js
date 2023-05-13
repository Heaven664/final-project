const db = require('../connection');

// CRUD - Create, Read, Update, Delete
const create = (name, description, agenda, host_id) => {
  const queryString = `INSERT INTO events (name, description, agenda, host_id) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [name, description, agenda, host_id];
  console.log("event.js create: ", values);
  return db.query(queryString, values)
    .then((data) => data.rows[0]);
};

const getAll = () => {
  return db.query('SELECT * FROM events;').then((data) => data.rows);
};

const getById = (id) => {
  return db
    .query('SELECT * FROM events WHERE id = $1;', [id])
    .then((data) => data.rows[0]);
};

const getByHostId = (host_id) => {
  return db
    .query('SELECT * FROM events WHERE host_id = $1;', [host_id])
    .then((data) => data.rows);
};

const update = (id, name, description, agenda) => {
  const queryString = `
  UPDATE events 
  SET name = $2, 
      description = $3, 
      agenda = $4 
  WHERE id = $1 
  RETURNING *;`;
  const values = [
    id,
    name, 
    description,
    agenda    
  ];
  console.log("update: ", values);
  return db.query(queryString, values)
    .then((data) => data.rows[0]);
};

const remove = (id) => {
  return db
    .query('DELETE FROM events WHERE id = $1;', [id])
    .then((data) => data.rows);
};

module.exports = { create, getAll, getById, getByHostId, update, remove };