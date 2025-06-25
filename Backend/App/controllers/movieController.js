const axios = require('axios');
const Movie = require('../models/movieModel'); // adjust the path as needed

const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDc4NDlkYmYwN2I0NWYxMTVkZTc0ZjQzMTAwYmMyOSIsIm5iZiI6MTc1MDMxOTU5NC42OTI5OTk4LCJzdWIiOiI2ODUzYzFlYWYzYzQwMjAzZDY3OWFmMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.uZ4S-40FQu3KkusIT09UcfmELq74gTcYnACCbRzyCXw';  // replace with your actual token

exports.fetchAndSaveMovie = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    // Search the movie
    const searchRes = await axios.get('https://api.themoviedb.org/3/search/movie', {
      headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
      params: { query: title }
    });

    const results = searchRes.data.results;
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const movieData = results[0]; // take the first matched movie

    // Get the credits (actors)
    const creditsRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieData.id}/credits`, {
      headers: { Authorization: `Bearer ${TMDB_TOKEN}` }
    });

    const actors = creditsRes.data.cast.slice(0, 5).map(c => c.name); // Top 5 actors

    // Map to your schema
    const movieDoc = new Movie({
      title: movieData.title,
      genres: movieData.genre_ids.map(id => id.toString()), // just IDs here; could fetch genre names if needed
      actors: actors,
      rating: movieData.vote_average,
      image: movieData.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` 
        : 'N/A'
    });

    // Save
    await movieDoc.save();

    res.status(201).json({ message: 'Movie saved', movie: movieDoc });

  } catch (err) {
    console.error('Error fetching/saving movie:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
