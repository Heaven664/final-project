const db = require('../connection');

// Get all users
const getAll = () => {
  const queryString = `SELECT * FROM users ORDER BY first_name;`;
  return db.query(queryString)
    .then(res => res.rows);
};

// Get one user
const getById = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

// Create new user
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

// Update user
const update = (id, first_name, last_name, country, city, birthday, about) => {
  const queryString = `
  UPDATE users 
  SET first_name = $2, 
      last_name = $3, 
      country = $4, 
      city = $5, 
      birthday = $6 , 
      about = $7
  WHERE id = $1
  RETURNING *;
  `;
  const values = [id, first_name, last_name, country, city, birthday, about];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

const updateAvatar = (id, newImagePath) => {
  const queryString = `
  UPDATE users 
  SET photo = $2
  WHERE id = $1
  RETURNING *;
  `;
  const values = [id, newImagePath];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

// Delete user
const remove = (id) => {
  const queryString = `DELETE FROM users WHERE id = $1;`;
  const values = [id];
  return db.query(queryString, values);
};


module.exports = { getAll, getById, create, update, updateAvatar, remove };