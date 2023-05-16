require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const PORT = 8080;
const io = new Server(server);

// Enable Cookie Sessions
const cookieSession = require('cookie-session');    // for Client Cookie Sessions
const session = cookieSession({ name: 'session', keys: ["secret"], sameSite: true });

// Express Configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(session);

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

// Allow socket.io to access session
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(session));


const clients = {};

app.post('/api/login', (req, res) => {
  const user = { id: 1 };
  req.session.user = user;
  res.json(user);
});

io.on('connection', socket => {
  console.log(`A user ${socket.id} connected`);

  // Get id from session
  const session = socket.request.session;
  const id = session?.user?.id;

  // Add client_id to clients lookup object
  clients[id] = socket.id;
  console.log(clients);

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on('message', (data) => {
    const { to, text} = data
    console.log(`one message for ${to}: ${clients[to]} text: ${text}`);
    const friend = clients[id];
    socket.to(friend).emit('private_message', {from: id, text})
  });


});


server.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT}`);
});