import React from "react";
import { useNavigate } from "react-router-dom";
import { foodItems } from "../data/foodItems";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper } from "@mui/material";

const FoodSearch = ({ search, setSearch }) => {
  const navigate = useNavigate();

  // Filter items based on search query
  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle item click
  const handleItemClick = (item) => {
    setSearch(""); // Clear search
    navigate(`/product/${item.id}`, { state: { product: item } }); // Navigate to product detail page
    window.scrollTo(0, 0); // Scroll to top
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {search && filteredItems.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            top: "100%",  // Places it right below the search bar
            left: 0,
            width: "100%",
            zIndex: 10, // Ensures it appears above other elements
            boxShadow: 3,
            borderRadius: 1,
            maxHeight: 250,
            overflowY: "auto",
          }}
        >
          <List>
            {filteredItems.map((item) => (
              <ListItem key={item.id} button onClick={() => handleItemClick(item)} sx={{ cursor: "pointer" }}>
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.name} sx={{ width: 56, height: 56 ,marginRight:2}} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`₹${item.price}`}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default FoodSearch;
