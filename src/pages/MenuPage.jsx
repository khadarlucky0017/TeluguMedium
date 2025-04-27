import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { foodItems } from '../data/foodItems';
import FoodCard from '../components/FoodCard';
import { Box, Typography, Grid, Snackbar, Alert } from '@mui/material';

const MenuPage = ({ cart, onAddToCart, updateQuantity }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [toastMessage, setToastMessage] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    onAddToCart(item);
    setToastMessage(`${item.name} added to cart!`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Navigate to PDP when a product is clicked
  const handleProductClick = (item) => {
    console.log(item)
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <Box maxWidth={1200} mx="auto" p={3}>
      {/* Page Heading */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Featured Dishes
      </Typography>

      {/* Food Grid */}
      <Grid container spacing={3} justifyContent="center">
        {foodItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <FoodCard
              item={item}
              cart={cart}
              onAddToCart={handleAddToCart}
              updateQuantity={updateQuantity}
              onClick={() => handleProductClick(item)} // Pass item to PDP
            />
          </Grid>
        ))}
      </Grid>

      {/* Toast Notification */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%", backgroundColor: "#f8a33c", color: "white", fontWeight: "bold", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MenuPage;
