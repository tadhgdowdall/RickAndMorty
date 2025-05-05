const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  characterId: { type: Number, required: true, unique: true },
  name: String,
  image: String
});

module.exports = mongoose.model('Favourite', favouriteSchema);