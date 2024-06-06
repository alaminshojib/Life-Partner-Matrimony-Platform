import * as React from 'react';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../../providers/AuthProvider';

function Login() {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;

        if (!isPasswordValid(password.value)) {
            showError('Invalid Password', 'Please enter a valid password.');
            return;
        }

        try {
            const result = await signIn(email.value, password.value);
            const user = result.user;
            showSuccess('User Login Successful');
            navigate(from, { replace: true });
        } catch (error) {
            handleAuthError(error);
        }
    };

    const isPasswordValid = (password) => {
        const minLength = 6;
        const containsLetter = /[a-zA-Z]/.test(password);
        const containsNumber = /\d/.test(password);

        return password.length >= minLength && containsLetter && containsNumber;
    };

    const handleOAuthLogin = (provider) => {
        provider()
            .then(result => {
                const user = result.user;
                showSuccess('User Login Successful');
                navigate(from, { replace: true });
            })
            .catch(error => {
                handleAuthError(error);
            });
    };

    const handleAuthError = (error) => {
        // Handle authentication errors here
    };

    const showError = (title, message) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            showConfirmButton: true,
        });
    };

    const showSuccess = (title) => {
        Swal.fire({
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <>
            <Helmet>
                <title>Life Partner | Login</title>
            </Helmet>
            <ThemeProvider theme={createTheme()}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    InputProps={{
                                        endAdornment: (
                                            <Box
                                                component="span"
                                                sx={{
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        color: 'primary.main',
                                                    },
                                                }}
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </Box>
                                        ),
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleOAuthLogin(googleSignIn)}
                                    className="text-[#002D74] border-2 py-2 my-2 w-fit px-3 mx-auto rounded-xl  flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
                                >
                                    <FcGoogle className="mr-3" />
                                    Login with Google
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href={"/signup"} variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
}

export default Login;
