import React, { useState } from 'react'
import { Dialog, FormLabel, TextField, Typography, Box, Button, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const AuthForm = ({ onSubmit, isAdmin }) => {
    const navigate = useNavigate();

    const handleNav = () => {
        navigate('/');
    }
    const [isSignup, setIsSignup] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ inputs, signup: isAdmin ? false : isSignup });

        // onSubmit({ inputs, signup: isAdmin ? false : isSignup });
    };
    return <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
        <Box sx={{ ml: "auto", padding: 1 }}>
            <IconButton onClick={handleNav}  >
                <CloseRoundedIcon />
            </IconButton>
        </Box>
        <Typography variant='h4' textAlign={'center'}>
            {isSignup ? "Signup" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit} >

            <Box display={'flex'}
                justifyContent={'center'}
                flexDirection="column"
                width={400}
                margin="auto"
                alignContent={"center"}
                padding={6}

            >
                {!isAdmin && isSignup && <>
                    <FormLabel sx={{ mt: 1, mb: 1 }}>Name</FormLabel>
                    <TextField margin='normal' variant="standard" type={'name'} name='name'
                        value={inputs.name}
                        onChange={handleChange} />
                </>
                }
                <FormLabel sx={{ mt: 1, mb: 1 }}>Email</FormLabel>
                <TextField margin='normal' variant="standard" type={'email'} name='email'
                    value={inputs.email}
                    onChange={handleChange} />
                <FormLabel sx={{ mt: 1, mb: 1 }}>Password</FormLabel>
                <TextField margin='normal'
                    variant="standard"
                    type={'password'}
                    name='password'
                    value={inputs.password}
                    onChange={handleChange} />
                <Button type="submit"
                    fullWidth
                    sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
                    variant='contained'

                >
                    {isSignup ? "Signup" : "Login"}

                </Button>
                {!isAdmin && <Button
                    fullWidth
                    sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
                    onClick={() => setIsSignup(!isSignup)}
                >
                    Switch To {isSignup ? "Login" : "Signup"}
                </Button>
                }


            </Box>
        </form>
    </Dialog>


}

export default AuthForm
