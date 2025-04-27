import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';

const featuredDishes = [
  { id: 1, name: 'Hyderabadi Biryani', image: require('../assets/Biryani.jpg') },
  { id: 2, name: 'Gongura Mutton', image: require('../assets/Mutton.jpg') },
  { id: 3, name: 'Pesarattu Dosa', image: require('../assets/Dosa.jpg') },
  { id: 4, name: 'Naatukodi Chicken', image: require('../assets/Country-Chicken.jpg') },
];

const HomePage = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const viewedProducts = JSON.parse(sessionStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewed(viewedProducts);
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Banner Section */}
      <Box position="relative" width="100%" height={500}>
        <CardMedia component="img" image={require('../assets/Home-Banner.jpg')} alt="Banner" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} width="100%" height="100%" bgcolor="rgba(0, 0, 0, 0.5)" display="flex" alignItems="center" justifyContent="center" flexDirection="column" color="white" textAlign="center" p={0} m={0} border="none">
          <Typography variant="h3" fontWeight="bold" mb={2}>Telugu Ruchulu</Typography>
          <Typography variant="h6" mb={3}>Authentic Andhra Cuisine at your doorstep</Typography>
          <Button component={Link} to="/menu" variant="contained" color="warning" sx={{ px: 3, py: 1.5, borderRadius: 5 }}>Order Now</Button>
        </Box>
      </Box>

      {/* Featured Dishes Section */}
      <Box py={5} textAlign="center" bgcolor="#f8f8f8">
        <Typography variant="h4" fontWeight="bold" mb={3} color="primary.dark">Featured Dishes</Typography>
        <Grid container spacing={3} justifyContent="center">
          {featuredDishes.map(dish => (
            <Grid item key={dish.id} xs={12} sm={6} md={3}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia component="img" height="180" image={dish.image} alt={dish.name} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="text.primary" textAlign="center">{dish.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recently Viewed Products Section */}
      {recentlyViewed.length > 0 && (
        <Box py={5} textAlign="center">
          <Typography variant="h4" fontWeight="bold" mb={3} color="primary.dark">Recently Viewed Products</Typography>
          <Grid container spacing={3} justifyContent="center">
            {recentlyViewed.map(product => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <Card sx={{ cursor: "pointer" }} onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
                  <CardMedia component="img" height="180" image={product.image} alt={product.name} />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
                    <Typography color="primary">₹{product.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
