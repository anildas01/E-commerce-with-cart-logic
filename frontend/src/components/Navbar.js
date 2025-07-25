import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loyaltyColors = {
  Bronze: '#cd7f32',
  Silver: '#b0b0b0',
  Gold: '#ffd700',
};

function Navbar({ cartCount, user, users, setUser }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectUser = (u) => {
    setUser(u);
    handleClose();
  };
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
          SmartCart
        </Typography>
        <Box sx={{ position: 'relative', mr: 2, width: 250 }}>
          <Box sx={{ position: 'absolute', height: '100%', display: 'flex', alignItems: 'center', pl: 1 }}>
            <SearchIcon color="action" />
          </Box>
          <InputBase
            placeholder="Search products…"
            sx={{
              color: 'inherit',
              pl: 4,
              width: '100%',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 1,
              fontSize: 16,
              '& input': { padding: '6px 8px' }
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        <IconButton color="inherit" sx={{ mr: 1 }} onClick={() => navigate('/cart')}>
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleMenu} sx={{ ml: 1 }}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem disabled>
            <ListItemIcon>
              <StarIcon sx={{ color: loyaltyColors[user.loyaltyLevel] }} />
            </ListItemIcon>
            <span>{user.name} ({user.loyaltyLevel})</span>
          </MenuItem>
          <Divider />
          {users.map(u => (
            <MenuItem key={u.id} onClick={() => handleSelectUser(u)} selected={u.id === user.id}>
              <ListItemIcon>
                <StarIcon sx={{ color: loyaltyColors[u.loyaltyLevel] }} />
              </ListItemIcon>
              {u.name} ({u.loyaltyLevel})
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;