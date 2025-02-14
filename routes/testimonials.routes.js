const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonial.controller');

router.route('/').get(TestimonialController.getAll);

router.route('/random').get(TestimonialController.getRandom);

router.route('/:id').get(TestimonialController.getById);

router.route('/').post(TestimonialController.addOne);

router.route('/:id').put(TestimonialController.updateOne);

router.route('/:id').delete(TestimonialController.delete);

module.exports = router;