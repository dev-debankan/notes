const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#ffffff', // Default white
  },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
