import React, { useEffect, useState } from 'react'
import { AppBar, Autocomplete, Toolbar, TextField, Tabs, Tab } from '@mui/material'
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { Box } from '@mui/system'
import { gettAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';

const Header = () => {
    const [value, setValue] = useState(0);
    const [movies, setMovies] = useState([]);




    useEffect(() => {
        gettAllMovies().then((data) => setMovies(data.movies)).catch(err => console.log(err));
    }, []);
    return <AppBar position='sticky' sx={{ bgcolor: "#2b2d42" }}>
        <Toolbar>
            <Box width={'20%'}>
                <MovieFilterIcon />
            </Box>
            <Box width={'35%'} margin={'auto'}>
                <Autocomplete
                    sx={{ borderRadius: 10, width: "50%", margin: "auto" }}
                    freeSolo
                    options={movies.map((option) => option.title)}
                    renderInput={(params) => <TextField {...params}
                        sx={{
                            borderRadius: 2,
                            input: { color: "white" },
                            bgcolor: "#2b2d42",
                            padding: "6px",
                        }}
                        label="Search All movies" />}
                />
            </Box>
            <Box display={'flex'}>
                <Tabs indicatorColor="secondary"
                    textColor='inherit'
                    value={value}
                    onChange={(e, val) => setValue(val)}
                >
                    <Tab label='Admin' to='/admin' LinkComponent={Link} />
                    <Tab label='Auth' to='/auth' LinkComponent={Link} />
                    <Tab label='All Movies' to='/movies' LinkComponent={Link} />
                </Tabs>

            </Box>
        </Toolbar>
    </AppBar>
}

export default Header
