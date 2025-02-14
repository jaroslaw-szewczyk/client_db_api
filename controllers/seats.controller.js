const Seat = require('../models/seat.model');

exports.getAll =  async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.getById = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
      const newSeat = new Seat({ 
        day: day, 
        seat: seat,
        client: client,
        email: email,
      });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const updateSeat= {};
    const { day, seat, client, email } = req.body;
  
    if (day) updateSeat.day = day;
    if (seat) updateSeat.seat = seat;
    if (client) updateSeat.client = client;
    if (email) updateSeat.email = email;
    
    const dep = await Seat.findById(req.params.id);
  
    if(dep) {
      await Seat.updateOne({ _id: req.params.id }, { $set: updateSeat });
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
    const dep = await Seat.findById(req.params.id);
    if(dep) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(500).json({message: 'Not found...'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};