const db = require('../connection');

const getAllEvents = () => {
  const queryString = `SELECT * FROM events`;
  return db.query(queryString)
    .then(result => {
      return result.rows
    })
    .catch((err) => console.log(err.message))
}

module.exports = getAllEvents;