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

// Delete friendlist
const remove = (id) => {
  const queryString = `
  DELETE FROM 
  friendlists 
  WHERE id = $1
  RETURNING *
  `;
  const values = [id];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

// Get friendlist id by users
const findByUsers = (user, friend) => {
  const queryString = `
  SELECT id 
  FROM friendlists 
  WHERE user_id = $1 AND friend_id = $2
  `;
  const values = [user, friend];
  return db.query(queryString, values)
    .then(res => res.rows[0].id);
};

module.exports = { getAll, getById, create, remove, findByUsers };