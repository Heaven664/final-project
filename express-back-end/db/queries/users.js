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
    .then(res => res.rows[0]);
};

const update = (id, first_name, last_name, email, password, country, city, birthday, photo, about) => {
  const queryString = `
  UPDATE users 
  SET first_name = $2, 
      last_name = $3, 
      email = $4, 
      password_digest = $5, 
      country = $6, 
      city = $7, 
      birthday = $8 , 
      photo = $9, 
      about = $10
  WHERE id = $1
  RETURNING *;
  `;
  const values = [id, first_name, last_name, email, password, country, city, birthday, photo, about];
  return db.query(queryString, values)
    .then(res => res.rows[0])
};
module.exports = { getAll, getById, create, update };