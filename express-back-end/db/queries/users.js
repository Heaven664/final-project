const db = require('../connection');

const getAll = () => {
  const queryString = `SELECT * FROM users;`;
  return db.query(queryString)
    .then(res => res.rows);
};

const getById = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const create = (first_name, last_name, email, password, country, city, birthday, photo, about) => {
  const queryString = `
    INSERT INTO 
    users (first_name, last_name, email, password_digest, country, city, birthday, photo, about)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  const values = [first_name, last_name, email, password, country, city, birthday, photo, about];
  return db.query(queryString, values)
    .then(res => res.rows[0])
};
module.exports = { getAll, getById, create };