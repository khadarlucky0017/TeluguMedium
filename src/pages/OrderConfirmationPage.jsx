import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Button, List, ListItem, Divider, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, formData, total, gstCharges, deliveryCharge, finalTotal } = location.state || {};
  const orderNumber = Math.floor(Math.random() * 1000000);

  useEffect(()=>{
    window.scrollTo(0, 0); // Scroll to top
  })

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 160px)", // Adjust based on your header + footer height
        py: 5 // Add some padding
      }}
    >
      <Card sx={{ textAlign: "center", p: 3, boxShadow: 3, width: "100%" }}>
        <CardContent>
          <CheckCircleIcon color="success" sx={{ fontSize: 50, mb: 1 }} />
          <Typography variant="h5" fontWeight="bold">Order Confirmed!</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Your order #{orderNumber} has been placed successfully.
          </Typography>

          {/* Ordered Items */}
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Ordered Items</Typography>
          <List>
            {cart?.map((item) => (
              <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{item.name} x {item.quantity}</Typography>
                <Typography fontWeight="bold">₹{item.price * item.quantity}</Typography>
              </ListItem>
            ))}
          </List>

          {/* Delivery Address */}
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Delivery Address</Typography>
          <Typography variant="body2">{formData?.name}, {formData?.phone}</Typography>
          <Typography variant="body2">{formData?.address}</Typography>
          <Typography variant='body2'>{formData?.state}, {formData?.postal}, {formData?.city}</Typography>
          <Typography variant="body2">{formData?.paymentMethod}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Bill Summary */}
          <Typography variant="h6" fontWeight="bold">Bill Summary</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography>Item Total</Typography>
            <Typography fontWeight="bold">₹{total}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography>GST Charges</Typography>
            <Typography fontWeight="bold">₹{gstCharges}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography>Delivery Fee</Typography>
            <Typography fontWeight="bold">₹{deliveryCharge}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, fontWeight: "bold", color: "primary.main" }}>
            <Typography variant="h6">Grand Total</Typography>
            <Typography variant="h6">₹{finalTotal}</Typography>
          </Box>

          {/* Back to Home Button */}
          <Button
            variant="contained"
            color="warning"
            sx={{ mt: 3, width: "100%" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>

  );
};

export default OrderConfirmationPage;
