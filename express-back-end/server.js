require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 8080;

// Express Configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const userRoutes = require('./routes/api-users');
const eventRoutes = require('./routes/api-event');
const friendListRoutes = require('./routes/api-friendlists');


app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/friendlists', friendListRoutes);

// Sample GET route
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
