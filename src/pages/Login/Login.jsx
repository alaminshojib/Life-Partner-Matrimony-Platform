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
import Swal from 'sweetalert2';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Container } from '@mui/material';

function Login() {
    const { signIn } = useContext(AuthContext);
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
    
        
    
        try {
            const result = await signIn(email.value, password.value);
            const user = result.user;
            showSuccess('User Login Successful');
            navigate(from, { replace: true });
        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                showError('Invalid email or password', 'Please try again.');
            } 
        }
    };
    
    const isPasswordValid = (password) => {
        const minLength = 6;
        const containsLetter = /[a-zA-Z]/.test(password);
        const containsNumber = /\d/.test(password);

        return password.length >= minLength && containsLetter && containsNumber;
    };

    const showError = (title, message) => {
        Swal.fire({
            icon: 'info',
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
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 5,
                            marginBottom: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
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
                                sx={{ mb: 1 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <SocialLogin />
                            <div className='flex items-center justify-between px-5'> 

                            <Box mt={2}>
                                <Link component="button" variant="body2" onClick={() => navigate("/forgot-password")}>
                                    Forgot password?
                                </Link>
                            </Box>
                            <Box mt={2}>
                                <Link component="button" variant="body2" onClick={() => navigate("/signup")}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Box>
                            </div>
                            
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default Login;
