import React from 'react';
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import img from '../../assets/404.gif';

const ErrorPage = ({ errorCode, errorMessage }) => {
  return (
    <>
      <Helmet>
        <title>Error | Life Partner</title>
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          
        }}
      >
        <img src={img} alt="404 Error" style={{ width: '450px', marginBottom: '20px' }} />
        <Typography variant="h4" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="h6" gutterBottom>
          {errorCode ? `Error ${errorCode}` : "Don't worry!"}
        </Typography>
        {errorMessage && (
          <Typography variant="body1" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <Button variant="contained" component={Link} to="/" sx={{ mt: 4, color: '#fff', backgroundColor: '#3f51b5' }}>
          Go to Home
        </Button>
      </Box>
    </>
  );
};

export default ErrorPage;
