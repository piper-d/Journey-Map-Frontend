import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const Footer = () => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#181C27',
                color: 'inherit',
                boxShadow: 'none',
                marginTop: 'auto',
            }}
        >
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Company</Typography>
                        <Box sx={{ mt: 1 }}>
                            <Link href="#" color="inherit" underline="none">About Us</Link><br />
                            <Link href="#" color="inherit" underline="none">Contact Us</Link><br />
                            <Link href="#" color="inherit" underline="none">GitHub</Link>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
