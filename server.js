const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

mongoose.connect('mongodb+srv://jaroslawszewczyk:B8hM729BU4VUyhay@cluster0.7ghve.mongodb.net/NewWaveDB?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;

app.use('/api/seats', seatsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/testimonials', testimonialsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on( 'connection', socket => {
  console.log('New Socket!');
});