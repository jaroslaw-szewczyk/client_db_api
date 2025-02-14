const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.route('/').get(SeatController.getAll);

router.route('/:id').get(SeatController.getById);

router.route('/').post(SeatController.addOne);

router.route('/:id').put(SeatController.updateOne);

router.route('/:id').delete(SeatController.delete);

module.exports = router;