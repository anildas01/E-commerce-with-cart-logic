import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const CARD_HEIGHT = 370;
const IMAGE_HEIGHT = 160;

function ProductCard({ product, addToCart }) {
  return (
    <Box sx={{ mb: 4, px: 1 }}>
      <Card
        sx={{
          height: CARD_HEIGHT,
          width: 320,
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 3,
          borderRadius: 2,
          transition: 'transform 0.2s',
          '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: 6 },
          overflow: 'hidden',
          m: '0 auto',
        }}
      >
        <Box
          sx={{
            height: IMAGE_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafafa',
            color: 'grey.400',
            p: 2
          }}
        >
          <ShoppingBagIcon sx={{ fontSize: 80 }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
            <Typography gutterBottom variant="h6" component="div" color="primary" sx={{ fontWeight: 600 }}>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {product.description}
            </Typography>
            <Chip label={product.category} size="small" color="secondary" sx={{ mb: 1 }} />
            <Typography variant="h6" color="success.main" sx={{ fontWeight: 600 }}>
              ${product.price}
            </Typography>
          </CardContent>
          <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddShoppingCartIcon />}
              fullWidth
              onClick={() => addToCart(product)}
              sx={{ fontWeight: 600, py: 1.2 }}
            >
              Add to Cart
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
}

export default ProductCard;