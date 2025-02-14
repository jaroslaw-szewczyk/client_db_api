const Concert = require('../models/concert.model');

exports.getAll =  async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ 
      performer: performer, 
      genre: genre,
      price: price,
      day: day,
      image: image
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const updateConcert = {};
    const { performer, genre, price, day, image } = req.body;
  
    if (performer) updateConcert.performer = performer;
    if (genre) updateConcert.genre = genre;
    if (price) updateConcert.price = price;
    if (day) updateConcert.day = day;
    if (image) updateConcert.image = image;
    
    const dep = await Concert.findById(req.params.id);
    console.log(updateConcert);
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, { $set: updateConcert });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(500).json({message: 'Not found...'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};