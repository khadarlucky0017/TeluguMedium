import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ProductDetailPage = ({ cart = [], onAddToCart, updateQuantity }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (product) {
            const viewedProducts = JSON.parse(sessionStorage.getItem('recentlyViewed')) || [];

            // Remove duplicate if exists
            const updatedProducts = viewedProducts.filter(item => item.id !== product.id);

            // Add the new product to the start of the array
            updatedProducts.unshift(product);

            // Limit the list to last 5 items
            if (updatedProducts.length > 5) {
                updatedProducts.pop();
            }

            sessionStorage.setItem('recentlyViewed', JSON.stringify(updatedProducts));
        }
    }, [product]);

    if (!product) {
        return <Typography variant="h5" textAlign="center" mt={5}>Product not found.</Typography>;
    }

    const cartItem = cart.find(item => item.id === product.id);
    const isCartNotEmpty = cart.length > 0; // Check if any item is in the cart

    return (
        <Box maxWidth={1200} mx="auto" p={3} display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" gap={3}>
            <CardMedia component="img" image={product.image} alt={product.name} sx={{ width: { xs: "100%", md: 400 }, height: 300, borderRadius: 2 }} />

            <Card sx={{ flex: 1, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
                    <Typography variant="body1" color="text.secondary" mt={1} mb={2}>{product.description}</Typography>
                    <Typography variant="h5" sx={{ color: "primary", fontWeight: "bold" }}>₹{product.price}</Typography>

                    <Box mt={3}>
                        {cartItem ? (
                            <Box display="flex" alignItems="center" gap={2}>
                                <IconButton onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}><RemoveIcon /></IconButton>
                                <Typography variant="h6" fontWeight="bold">{cartItem.quantity}</Typography>
                                <IconButton onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}><AddIcon /></IconButton>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => onAddToCart(product)}
                                sx={{
                                    backgroundColor: '#f8a33c',
                                    '&:hover': { backgroundColor: '#f8a33c' }
                                }}
                            >
                                Add to Cart
                            </Button>

                        )}
                    </Box>

                    {isCartNotEmpty && (
                        <Box mt={3} display="flex" gap={2}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate('/cart')}
                                sx={{
                                    backgroundColor: '#f8a33c',
                                    color: 'white',
                                }}
                            >
                                View Cart
                            </Button>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => navigate('/checkout')}
                                sx={{
                                    backgroundColor: '#f8a33c',
                                    color: 'white',
                                }}
                            >
                                Checkout
                            </Button>

                        </Box>
                    )}

                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{
                            mt: 2,
                            '&:hover': {
                                color: '#f8a33c',
                                borderColor: '#f8a33c',
                            }
                        }}
                        onClick={() => navigate('/menu')}
                    >
                        Back to Menu
                    </Button>

                </CardContent>
            </Card>
        </Box>
    );
};

export default ProductDetailPage;
