// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://192.168.1.40:27017/camping')
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error('MongoDB connection error!', err));

// Basit bir model tanımlama
const Booking = mongoose.model('Booking', {
    destination: String,
    date: String,
    people: Number
});

// Kök URL için rota tanımlama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Statik dosyaları sunma
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.post('/api/book', (req, res) => {
    const booking = new Booking(req.body);
    booking.save()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(400).json({ success: false, error: err }));
});

// Sunucuyu başlatma
app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});