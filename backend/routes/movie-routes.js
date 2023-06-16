import express from 'express'
import { addMovies, getMovieById, getMovies } from '../controllers/movie-controllers';
const movieRouter = express.Router();


movieRouter.post('/', addMovies)
movieRouter.get('/', getMovies)
movieRouter.get('/:id', getMovieById)

export default movieRouter