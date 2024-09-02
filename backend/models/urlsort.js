const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
    unique: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('URL', urlSchema);
