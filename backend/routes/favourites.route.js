const express = require('express');
const router = express.Router();
const Favourite = require('../models/favourite.model'); 

// GET all
router.get('/', async (req, res) => {
  try {
    const favourites = await Favourite.find();
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new
router.post('/', async (req, res) => {
  const { characterId, name, image } = req.body;
  const exists = await Favourite.findOne({ characterId });
  if (exists) return res.status(409).json({ message: 'Already added' });

  const favourite = new Favourite({ characterId, name, image });
  await favourite.save();
  res.status(201).json(favourite);
});

// DELETE
router.delete('/:characterId', async (req, res) => {
  const { characterId } = req.params;
  await Favourite.deleteOne({ characterId });
  res.json({ message: 'Removed from favourites' });
});

module.exports = router;
