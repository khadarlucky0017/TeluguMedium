import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <Box component="footer"
            sx={{
                backgroundColor: '#f8a33c',
                color: 'white',
                py: 5,
                textAlign: 'center',
            }}
        >
            <Grid container spacing={3} justifyContent="center" maxWidth="100%" mx="auto">
                {/* Logo and About */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h5" fontWeight="bold" mb={1}>Telugu Ruchulu</Typography>
                    <Typography variant="body2" mt={1} mb={2}>Authentic Andhra Cuisine, delivered fresh to your doorstep.</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{ textDecoration: "none" }}>
                    <Typography variant="h6" gutterBottom>Quick Links</Typography>
                    <Typography component={Link} to="/" color="inherit" display="block" mb={1} sx={{ textDecoration: "none" }}>Home</Typography>
                    <Typography component={Link} to="/menu" color="inherit" display="block" mb={1} sx={{ textDecoration: "none" }}>Menu</Typography>
                    <Typography component={Link} to="/about" color="inherit" display="block" mb={1} sx={{ textDecoration: "none" }}>About Us</Typography>
                    <Typography component={Link} to="/contact" color="inherit" display="block" sx={{ textDecoration: "none" }}>Contact</Typography>
                </Grid>

                {/* Contact Info */}
                <Grid item xs={12} sm={6} md={3} display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <Typography variant="h6" gutterBottom>Contact Us</Typography>
                    <Typography variant="body2" display="flex" alignItems="center" gap={1} mb={1}>
                        <FaMapMarkerAlt /> Hyderabad, India
                    </Typography>
                    <Typography variant="body2" display="flex" alignItems="center" gap={1} mb={1}>
                        <FaPhone /> +91 98765 43210
                    </Typography>
                    <Typography variant="body2" display="flex" alignItems="center" gap={1}>
                        <FaEnvelope /> info@teluguruchulu.com
                    </Typography>
                </Grid>

                {/* Social Media */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>Follow Us</Typography>
                    <Box display="flex" justifyContent="center" gap={2} mt={1}>
                        <IconButton component="a" href="https://www.facebook.com" target="_blank" color="inherit">
                            <FaFacebook />
                        </IconButton>
                        <IconButton component="a" href="https://www.instagram.com" target="_blank" color="inherit">
                            <FaInstagram />
                        </IconButton>
                        <IconButton component="a" href="https://www.twitter.com" target="_blank" color="inherit">
                            <FaTwitter />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            {/* Copyright */}
            <Box mt={3} pt={2} borderTop={1} borderColor="rgba(255, 255, 255, 0.2)">
                <Typography variant="body2">&copy; 2025 Telugu Ruchulu. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default Footer;
