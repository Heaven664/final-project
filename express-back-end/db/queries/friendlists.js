const db = require('../connection');

// Get all friendlists
const getAll = () => {
  const queryString = `
  SELECT * FROM friendlists;
  `;
  return db.query(queryString)
    .then(res => res.rows);
};

// Get one friendlist by ID
const getById = (id) => {
  const queryString = `
  SELECT * FROM friendlists WHERE id = $1;
  `;
  const values = [id];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

// Create new friendlist
const create = (user, friend) => {
  const queryString = `
  INSERT INTO 
  friendlists (user_id, friend_id)
  VALUES ($1, $2)
  RETURNING *;
  `;
  const values = [user, friend];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

module.exports = { getAll, getById, create };