import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { gettAllMovies } from '../api-helpers/api-helpers'

const HomePage = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        gettAllMovies().then((data) => setMovies(data.movies))
            .catch(e => console.log(e))
    }, []);
    console.log(movies);
    return (
        <Box width={'100%'} height='100%' margin='auto' marginTop={2}>
            <Box margin={"auto"} width="80%" height={"65vh"} padding={1} display="flex">
                <img src='https://www.wdwinfo.com/wp-content/uploads/2023/02/Indiana-Jones-and-the-Dial-of-Destiny.jpeg' alt='indian jones'
                    width={'100%'}
                    height={'100%'} />
            </Box>
            <Box padding={5} margin={"auto"}>
                <Typography variant="h4" textAlign={"center"}>
                    Latest Releases
                </Typography>

            </Box>
            <Box gap={5}
                margin="auto"
                width="100%"
                flexWrap={"wrap"}
                display="flex"
                justifyContent={"center"}>
                {movies && movies.map((movie) => <MovieItem id={movie._id} title={movie.title}
                    posterUrl={movie.posterUrl}
                    releaseDate={movie.releaseDate}
                    key={movie.id} />)}

            </Box>
            <Box display='flex' padding={5} margin='auto'>
                <Button
                    variant="outlined"
                    to='/movies'
                    LinkComponent={Link}
                    sx={{ margin: "auto", color: "#2b2d42" }}
                >
                    View All Movies
                </Button>

            </Box>
        </Box>
    )
}

export default HomePage
