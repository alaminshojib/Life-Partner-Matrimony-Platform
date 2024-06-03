
   
    import * as React from 'react';
    import { useContext } from 'react';
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
    import { AuthContext } from '../../providers/AuthProvider';
    import Swal from 'sweetalert2';
    // Import the Visibility and VisibilityOff icons from MUI
    import Visibility from '@mui/icons-material/Visibility';
    import VisibilityOff from '@mui/icons-material/VisibilityOff';
    
    function Login() {
        const { signIn, googleSignIn } = useContext(AuthContext);
        const navigate = useNavigate();
        const location = useLocation();
        const from = location.state?.from?.pathname || "/";
    
        // Inside the Login component
        const [showPassword, setShowPassword] = React.useState(false);
    
        // Function to toggle password visibility
        const togglePasswordVisibility = () => {
            setShowPassword((prevShowPassword) => !prevShowPassword);
        };
    
        const handleLogin = async (event) => {
            event.preventDefault();
            const form = event.target;
            const email = form.email.value;
            const password = form.password.value;
        
            // Perform password validity check
            if (!isPasswordValid(password)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Password',
                    text: 'Please enter a valid password.'
                });
                return; // Stop execution if password is invalid
            }
        
            try {
                const result = await signIn(email, password);
                const user = result.user;
                Swal.fire({
                    icon: 'success',
                    title: 'User Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            } catch (error) {
                let errorMessage = 'Login Failed';
                if (error.code === 'auth/user-not-found') {
                    errorMessage = 'User not found. Please check your email and try again.';
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Incorrect password. Please try again.';
                } else if (error.code === 'auth/too-many-requests') {
                    errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
                }
                Swal.fire({
                    icon: 'error',
                    title: errorMessage
                });
            }
        };
        
        // Function to check if password is valid
        const isPasswordValid = (password) => {
            // Define your password criteria (e.g., minimum length, required characters)
            const minLength = 6;
            const containsLetter = /[a-zA-Z]/.test(password);
            const containsNumber = /\d/.test(password);
            // Add more criteria as needed
        
            // Check if password meets all criteria
            return password.length >= minLength && containsLetter && containsNumber;
        };
        
        const handleOAuthLogin = (provider) => {
            provider()
                .then(result => {
                    const user = result.user;
                    Swal.fire({
                        icon: 'success',
                        title: 'User Login Successful',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(from, { replace: true });
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: error.message
                    });
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
                                        type={showPassword ? 'text' : 'password'} // Show/Hide password functionality
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
                                    <button onClick={() => handleOAuthLogin(googleSignIn)} className="text-[#002D74] border-2 py-2 my-2 w-fit px-3 mx-auto rounded-xl  flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
                                        <FcGoogle className="mr-3" />
                                        Login with Google
                                    </button>
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
    