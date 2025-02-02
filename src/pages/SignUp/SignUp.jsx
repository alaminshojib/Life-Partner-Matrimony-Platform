import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from "../../providers/AuthProvider";

// Define default theme
const defaultTheme = createTheme();

// SignUp function component
export default function SignUp() {
    // Custom hook for Axios instance
    const axiosPublic = useAxiosPublic();

    // React Hook Form setup
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // React Router navigation hook
    const navigate = useNavigate();

    // Authentication context for user creation
    const { createUser, updateUserProfile } = useContext(AuthContext);

    // State for showing/hiding password
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form submission handler
    const onSubmit = data => {
        setIsLoading(true);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.firstName + " " + data.lastName, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.firstName + " " + data.lastName,
                            email: data.email
                        }
                        // Create user entry in the database
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    // Show SweetAlert on success
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'User created successfully',
                                        showConfirmButton: false,
                                        timer: 2000
                                    });
                                    // Navigate to login page
                                    navigate('/login');
                                }
                            })
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.error(error);
                        // Handle error here
                    });
            })
            .catch(error => {
                setIsLoading(false);
                console.error(error);
                // Handle error here
            });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    // Render JSX
    return (
        <>
            <Helmet>
                <title>Life Partner | Sign Up</title>
            </Helmet>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom:8,
                        
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                            {/* Form fields */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        {...register("firstName", { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        {...register("lastName", { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        {...register("email", { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="photoURL"
                                        label="Photo URL"
                                        name="photoURL"
                                        type="url"
                                        autoComplete="photoURL"
                                        {...register("photoURL", { required: true })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="new-password"
                                        {...register("password", {
                                            required: true,
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters long'
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: 'Password must not exceed 20 characters'
                                            },
                                            pattern: {
                                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                                            }
                                        })}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={togglePasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    {errors.password && (
                                        <Typography variant="caption" color="error">
                                            {errors.password.message}
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            {/* Submit button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                            </Button>
                            {/* Link to login page */}
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href={"/login"} variant="body2">
                                        {"Already have an account? Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    </Container>
            </ThemeProvider>
        </>
    );
}
