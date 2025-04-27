import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, Grid, IconButton, Divider } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h4" gutterBottom>Your Cart is Empty</Typography>
        <Button variant="contained" color="" onClick={() => navigate('/menu')}>Browse Menu</Button>
      </Box>
    );
  }

  return (
    <Box maxWidth={1200} mx="auto" p={3}>
      <Typography variant="h4" textAlign="center" mb={3}>Your Cart</Typography>
      <Grid container spacing={3}>
        {/* Left Side - Cart Items */}
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2 }}>
              <Box component="img" src={item.image} alt={item.name} sx={{ width: 80, height: 80, borderRadius: 1, mr: 2 }} />
              <Box flexGrow={1}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">₹{item.price}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}><RemoveIcon /></IconButton>
                <Typography variant="body1" mx={1}>{item.quantity}</Typography>
                <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}><AddIcon /></IconButton>
                <IconButton color="error" onClick={() => removeFromCart(item.id)}><DeleteIcon /></IconButton>
              </Box>
            </Card>
          ))}
        </Grid>

        {/* Right Side - Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Bill Summary</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Item Total:</Typography>
              <Typography>₹{total}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>GST Charges:</Typography>
              <Typography>₹10</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Delivery Fee:</Typography>
              <Typography>₹40</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" fontWeight="bold">
              <Typography variant="h6">Grand Total:</Typography>
              <Typography variant="h6">₹{total + 10 + 40}</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth sx={{
              mt: 3,
              backgroundColor: '#f8a33c',
              color: 'white',
            }} onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
