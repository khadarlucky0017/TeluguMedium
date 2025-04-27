import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  IconButton,
  TextField,
  InputAdornment,
  AppBar,
  Toolbar,
  Box
} from "@mui/material";
import { ShoppingCart, Close } from "@mui/icons-material";
import FoodSearch from "./FoodSearch";
import logo from "../assets/Logo.jpg";

const Header = ({ cartCount }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#f8a33c",
        height: { xs: "80px", md: "100px" },
        justifyContent: "center"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "nowrap", // 🚫 No wrapping
          gap: 1,
          px: { xs: 1, sm: 2 },
          minHeight: { xs: "80px", md: "100px" }
        }}
      >
        {/* Logo */}
        <Box
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Telugu Medium Logo"
            style={{
              height: "50px",
              objectFit: "contain"
            }}
          />
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            mx: 1,
            maxWidth: { xs: "180px", sm: "250px", md: "300px" }
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{ backgroundColor: "white", borderRadius: 1 }}
            slotProps={{
              input: {
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch("")}>
                      <Close fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
        </Box>

        {/* Cart Icon */}
        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>

      {/* Food Search Dropdown */}
      <FoodSearch search={search} setSearch={setSearch} />
    </AppBar>
  );
};

export default Header;
