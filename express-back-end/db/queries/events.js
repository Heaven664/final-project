const db = require('../connection');

// CRUD - Create, Read, Update, Delete
const create = (newEvent) => {
  const { name, description, host_id } = newEvent;
  return db
    .query(
      'INSERT INTO events (name, description, host_id) VALUES ($1, $2, $3) RETURNING *;',
      [name, description, host_id]
    )
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

const update = (updatedEvent) => {
  const { id, name, description, agenda } = updatedEvent;
  return db
    .query('UPDATE events SET name = $1, description = $2, agenda = $3 WHERE id = $4 RETURNING *;', [
      name, 
      description,
      agenda,
      id,
    ])
    .then((data) => data.rows[0]);
};

const remove = (id) => {
  return db
    .query('DELETE FROM events WHERE id = $1;', [id])
    .then((data) => data.rows);
};

module.exports = { create, getAll, getById, getByHostId, update, remove };