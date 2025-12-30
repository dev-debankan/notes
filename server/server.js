const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const notesRouter = require('./routes/notes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        "https://note-app.vercel.app",
        "https://note-jno2zrnde-debankans-projects-612f2abb.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/notes', notesRouter);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
