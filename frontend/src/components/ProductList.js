import React from 'react';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';

function ProductList({ products, addToCart }) {
  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} addToCart={addToCart} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;