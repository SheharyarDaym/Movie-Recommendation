const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// POST /movies/fetch - fetch from TMDb and save
router.post('/fetch', movieController.fetchAndSaveMovie);

// GET /movies - get all movies in DB
router.get('/', movieController.getAllMovies);

module.exports = router;
