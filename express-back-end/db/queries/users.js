const db = require('../connection');

const getAllUsers = () => {
  const queryString = `SELECT * FROM users`;
  return db.query(queryString)
    .then(res => res.rows);
};

const getUserById = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1`;
  const values = [id];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

module.exports = { getAllUsers, getUserById };