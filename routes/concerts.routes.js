const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.route('/').get(ConcertController.getAll);

router.route('/:id').get(ConcertController.getById);

router.route('/').post(ConcertController.addOne);

router.route('/:id').put(ConcertController.updateOne);

router.route('/:id').delete(ConcertController.delete);

module.exports = router;