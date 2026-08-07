const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogController');

router.get('/dogs', dogController.all_dogs);
router.get('/adopted', dogController.dog_adopted_get);
router.get('/register', dogController.dog_register_get);
router.post('/register', dogController.dog_register_post);
// router.get('/adopt/:id', dogController.dog_adopt_get);
router.post('/adopt/:id', dogController.dog_adopt_post);
router.get('/myDogs', dogController.my_dogs_get);
router.delete('/myDogs/:id', dogController.delete_dog);
module.exports= router;  