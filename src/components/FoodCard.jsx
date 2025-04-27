import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const FoodCard = ({ item, cart, onAddToCart, updateQuantity }) => {
  const navigate = useNavigate();
  const cartItem = cart.find(cartItem => cartItem.id === item.id);

  // Navigate to Product Detail Page when clicking on the card
  const handleCardClick = () => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <Card
      sx={{ maxWidth: 300, cursor: 'pointer', boxShadow: 3, borderRadius: 2 }}
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image={item.image}
        alt={item.name}
      />

      <CardContent>
        {/* Product Name */}
        <Typography variant="h6" fontWeight="bold">
          {item.name}
        </Typography>

        {/* Product Description */}
        <Typography variant="body2" color="text.secondary" mb={2}>
          {item.description}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Product Price */}
          <Typography variant="h6" color="primary">
            ₹{item.price}
          </Typography>

          {/* Quantity Controls / Add to Cart */}
          {cartItem ? (
            <Box display="flex" alignItems="center" onClick={(e) => e.stopPropagation()}>
              <IconButton onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" fontWeight="bold">{cartItem.quantity}</Typography>
              <IconButton onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: '#f8a33c', '&:hover': { backgroundColor: '#f8a33c' } }}
              onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
            >
              Add to Cart
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
