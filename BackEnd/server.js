const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());  // Allow cross-origin requests

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // Allow specific HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  // Allow certain headers
  next();  // Proceed to the next middleware
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data
app.use(bodyParser.json());  // Parse JSON data

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14');  // Connect to MongoDB

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

const movieModel = new mongoose.model('myMovies', movieSchema);

// Get all movies
app.get('/api/movies', async (_req, res) => {
  const movies = await movieModel.find({});  // Fetch movies from DB
  res.status(200).json({ movies });  // Send movies as JSON response
});

// Get movie by ID
app.get('/api/movie/:id', async (req, res) => {  
  let movie = await movieModel.findById(req.params.id);  // Find movie by ID
  res.send(movie);  // Send the movie data back
});

// Add a new movie
app.post('/api/movies', async (req, res) => {
  console.log(req.body.title);  // Log the title of the new movie
  const { title, year, poster } = req.body;  // Get movie details

  const newMovie = new movieModel({ title, year, poster });  // Create a new movie
  await newMovie.save();  // Save movie to DB

  res.status(201).json({ "message": "Movie Added!", Movie: newMovie });  // Confirm movie added
});

// Update a movie by ID
app.put('/api/movie/:id', async (req, res) => {  
  let movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Update movie data
  res.send(movie);  // Send updated movie back
});

// deleating movie
app.delete('/api/movie/:id', async  (req, res) => {
  console.log('Deleting movie with ID:', req.params.id);
  const movie = await movieModel.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Movie deleted successfully", movie });
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);  // Server is live
});



// {
//   "Title": "Avengers: Infinity War (server)",
//   "Year": "2018",
//   "imdbID": "tt4154756",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
// },
// {
//   "Title": "Captain America: Civil War (server)",
//   "Year": "2016",
//   "imdbID": "tt3498820",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
// },
// {
//   "Title": "World War Z (server)",
//   "Year": "2013",
//   "imdbID": "tt0816711",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
// }