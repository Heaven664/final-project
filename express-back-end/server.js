require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const PORT = 8080;
const io = new Server(server);

// Express Configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const userRoutes = require('./routes/api-users');
const eventRoutes = require('./routes/api-event');
const eventUserRoutes = require('./routes/api-event-user');
const friendListRoutes = require('./routes/api-friendlists');
const privateMessagesRoutes = require('./routes/api-private_messages');
const groupMessagesRoutes = require('./routes/api-group_messages');
const fundraisersRoutes = require('./routes/api-fundraisers');


app.use(express.static('public'));
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-users', eventUserRoutes);
app.use('/api/friendlists', friendListRoutes);
app.use("/api/pmsg", privateMessagesRoutes);
app.use("/api/gmsg", groupMessagesRoutes);
app.use("/api/fundraisers", fundraisersRoutes);

io.on('connection', (socket) => {
  console.log(`A user ${socket.id} connected`);
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT}`);
});
