const express = require('express');
const cors = require('cors');
const { calculateCart } = require('./cartLogic');

const app = express();
app.use(cors());
app.use(express.json());

const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 1000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      description: "High performance laptop for work and play."
    },
    {
      id: 2,
      name: "Book",
      category: "Books",
      price: 20,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
      description: "A fascinating book to expand your knowledge."
    },
    {
      id: 3,
      name: "T-shirt",
      category: "Clothing",
      price: 25,
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      description: "Comfortable cotton T-shirt in various sizes."
    },
    {
      id: 4,
      name: "Headphones",
      category: "Electronics",
      price: 150,
      image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
      description: "Noise-cancelling over-ear headphones."
    },
    {
      id: 5,
      name: "Novel",
      category: "Books",
      price: 15,
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      description: "A thrilling novel to keep you hooked."
    },
    {
      id: 6,
      name: "Jeans",
      category: "Clothing",
      price: 40,
      image: "https://images.unsplash.com/photo-1514995669114-d1c1b7a83a48?auto=format&fit=crop&w=400&q=80",
      description: "Stylish and durable jeans."
    },
    {
      id: 7,
      name: "Smartphone",
      category: "Electronics",
      price: 800,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
      description: "Latest model smartphone with advanced features."
    },
    {
      id: 8,
      name: "Cookbook",
      category: "Books",
      price: 30,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      description: "Delicious recipes from around the world."
    },
    {
      id: 9,
      name: "Jacket",
      category: "Clothing",
      price: 60,
      image: "https://images.unsplash.com/photo-1526178613658-3f1622045557?auto=format&fit=crop&w=400&q=80",
      description: "Warm and stylish jacket for all seasons."
    },
    {
      id: 10,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 120,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      description: "Portable speaker with high-quality sound."
    },
    {
      id: 11,
      name: "Children's Storybook",
      category: "Books",
      price: 18,
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      description: "Fun and educational stories for kids."
    },
    {
      id: 12,
      name: "Dress",
      category: "Clothing",
      price: 55,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      description: "Elegant dress for special occasions."
    },
    {
      id: 13,
      name: "Tablet",
      category: "Electronics",
      price: 500,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      description: "Lightweight tablet for work and entertainment."
    },
    {
      id: 14,
      name: "Science Magazine",
      category: "Books",
      price: 12,
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
      description: "Monthly magazine with the latest science news."
    },
    {
      id: 15,
      name: "Sneakers",
      category: "Clothing",
      price: 70,
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
      description: "Comfortable sneakers for everyday use."
    },
    {
      id: 16,
      name: "Smartwatch",
      category: "Electronics",
      price: 250,
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
      description: "Track your fitness and notifications on the go."
    },
    {
      id: 17,
      name: "Biography",
      category: "Books",
      price: 22,
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      description: "Inspiring life story of a famous personality."
    },
    {
      id: 18,
      name: "Sweater",
      category: "Clothing",
      price: 45,
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      description: "Cozy sweater for chilly days."
    },
    {
      id: 19,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 35,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      description: "Ergonomic wireless mouse for easy navigation."
    },
    {
      id: 20,
      name: "Graphic Novel",
      category: "Books",
      price: 28,
      image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
      description: "A visually stunning graphic novel."
    }
  ];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/cart/checkout', (req, res) => {
  const { items, customer } = req.body;
  const result = calculateCart(items, customer);
  res.json(result);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));