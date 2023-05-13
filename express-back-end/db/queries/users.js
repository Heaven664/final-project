const db = require('../connection');

const getAllUsers = () => {
  const queryString = `SELECT * FROM users`;
  return db.query(queryString)
    .then(result => {
      return result.rows;
    })
    .catch((err) => console.log(err.message));
};

module.exports = { getAllUsers };