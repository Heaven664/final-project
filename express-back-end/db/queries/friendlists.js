const db = require('../connection');

const getAll = () => {
  const queryString = `
  SELECT * FROM friendlists;
  `;
  return db.query(queryString)
    .then(res => res.rows);
};

const getById = (id) => {
  const queryString = `
  SELECT * FROM friendlists WHERE id = $1;
  `;
  const values = [id];
  return db.query(queryString, values)
    .then(res => res.rows[0]);
};

module.exports = { getAll, getById };