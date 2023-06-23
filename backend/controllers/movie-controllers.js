import jwt from 'jsonwebtoken'
import Movie from '../models/Movies'
import mongoose from 'mongoose';
import Admin from '../models/Admin';
export const addMovies = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === '') {
        return res.status(404).json({ message: 'Token not Found' })
    }

    let adminId;

    //verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) return res.status(400).json({ message: `${err}` })
        else {
            adminId = decrypted.id;
            return;
        }
    })


    const { title, description, releaseDate, posterUrl, actors, featured } = req.body;


    if (
        !title &&
        title.trim() === "" &&
        !description &&
        description.trim() == "" &&
        !posterUrl &&
        posterUrl.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }


    let movie;

    try {


        movie = new Movie({
            description,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            actors,
            admin: adminId,
            posterUrl,
            title,
        })


        //creating a session
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();

        await movie.save({ session });
        adminUser.addedMovies.push(movie)
        await adminUser.save({ session });

        await session.commitTransaction();


    } catch (error) {
        return console.log(error);

    }

    if (!movie) return res.status(500).json({ message: 'Request movie adding failed' })
    return res.status(201).json({ movie })
}

export const getMovies = async (req, res, next) => {
    let movies;


    try {
        movies = await Movie.find();


    } catch (error) {
        return console.log(error)
    }


    if (!movies) return res.status(500).json({ message: 'Movie fetching failed' })

    return res.status(200).json({ movies })
}

export const getMovieById = async (req, res, next) => {
    const id = req.params.id;
    let movie;


    try {
        movie = await Movie.findById(id);
    } catch (error) {
        return console.log(error)
    }


    if (!movie) return res.status(404).json({ message: 'movie fetching failed' })

    return res.status(200).json({ movie })
}