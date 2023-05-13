require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 8080;

const db = require("./db/connection.js");
const fundraisers = require("./routes/api-fundraisers.js");


// Express Configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const apiRoutes = require('./routes/api-users');
app.use('/api/users', apiRoutes)
app.use("/api", fundraisers(db));

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
