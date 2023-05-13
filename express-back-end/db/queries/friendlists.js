const db = require('../connection');

const getAll = () => {
  const queryString = `
  SELECT * FROM friendlists;
  `;
  return db.query(queryString)
    .then(res => res.rows);
};

module.exports = { getAll };