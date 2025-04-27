import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Typography, TextField, Button, Divider } from '@mui/material';

const CheckoutPage = ({ cart, clearCart }) => {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    state: '',
    city: '',
    postal: '',
    paymentMethod: 'Cash on Delivery'
  });

  const [errors, setErrors] = useState({});

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gstCharges = 10;
  const deliveryCharge = 40;
  const finalTotal = total + gstCharges + deliveryCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "address is required";
    if (!formData.state.trim()) newErrors.state = "state is required";
    if (!formData.postal.trim()) newErrors.postal = "postal code is required";
    if (!formData.postal.trim()) newErrors.city = "city is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    clearCart();
    navigate("/order-confirmation", {
      state: { cart, formData, total, gstCharges, deliveryCharge, finalTotal },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Delivery Form */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Delivery Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.address}
                helperText={errors.address}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.state}
                    helperText={errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Postal Code"
                    name="postal"
                    value={formData.postal}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.postal}
                    helperText={errors.postal}
                  />
                </Grid>
              </Grid>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Payment Method: <b>Cash on Delivery</b>
              </Typography>
            </form>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Bill Summary
            </Typography>
            {cart.map(item => (
              <Typography key={item.id} variant="body1">
                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
              </Typography>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">Item Total: ₹{total}</Typography>
            <Typography variant="body1">GST Charges: ₹{gstCharges}</Typography>
            <Typography variant="body1">Delivery Partner Fee: ₹{deliveryCharge}</Typography>
            <Typography variant="h6" sx={{ mt: 2, color: '#f8a33c' }}>
              Grand Total: ₹{finalTotal}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2, backgroundColor: '#f8a33c',
                color: 'white',
              }}
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
