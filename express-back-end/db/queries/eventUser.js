const db = require('../connection');

const getAll = () => {
  return db.query('SELECT * FROM event_user;').then((data) => data.rows);
};

module.exports = {  getAll };