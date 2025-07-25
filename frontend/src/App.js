import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const USERS = [
  { id: 1, name: 'Alice', loyaltyLevel: 'Bronze' },
  { id: 2, name: 'Bob', loyaltyLevel: 'Silver' },
  { id: 3, name: 'Carol', loyaltyLevel: 'Gold' },
];

function App() {
  const [products, setProducts] = useState([]);
  // carts: { [userId]: cartArray }
  const [carts, setCarts] = useState({ 1: [], 2: [], 3: [] });
  const [selectedUser, setSelectedUser] = useState(USERS[0]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  // Get the current user's cart
  const cart = carts[selectedUser.id] || [];

  // Update only the current user's cart
  const setCartForUser = (cartArr) => {
    setCarts(prev => ({ ...prev, [selectedUser.id]: cartArr }));
  };

  const addToCart = (product) => {
    const prev = carts[selectedUser.id] || [];
    const found = prev.find(i => i.id === product.id);
    let newCart;
    if (found) {
      newCart = prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      newCart = [...prev, { ...product, quantity: 1 }];
    }
    setCartForUser(newCart);
  };

  const removeFromCart = (id) => {
    const prev = carts[selectedUser.id] || [];
    setCartForUser(prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    const prev = carts[selectedUser.id] || [];
    setCartForUser(prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const handleCheckout = (customerInfo) => {
    fetch('http://localhost:4000/cart/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, customer: { loyaltyLevel: selectedUser.loyaltyLevel } })
    })
      .then(res => res.json())
      .then(result => {
        setCheckoutResult(result);
        setOrderInfo(customerInfo);
        setCartForUser([]);
        setShowCheckout(true);
      });
  };

  // When switching users, reset checkout state
  const handleUserSwitch = (user) => {
    setSelectedUser(user);
    setShowCheckout(false);
    setCheckoutResult(null);
    setOrderInfo(null);
  };

  // CartPage placeholder (to be implemented)
  const CartPage = (props) => (
    <CartSidebar
      cart={cart}
      removeFromCart={removeFromCart}
      updateQuantity={updateQuantity}
      handleCheckout={handleCheckout}
      showCheckout={showCheckout}
      setShowCheckout={setShowCheckout}
      checkoutResult={checkoutResult}
      orderInfo={orderInfo}
      loyaltyLevel={selectedUser.loyaltyLevel}
      fullPage
    />
  );

  return (
    <Router>
      <Navbar cartCount={cart.length} user={selectedUser} users={USERS} setUser={handleUserSwitch} />
      <Routes>
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/"
          element={
            <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#f8f9fa' }}>
              <div style={{ flex: 1, maxWidth: '100%', padding: '2rem 2rem 2rem 2rem' }}>
                <h1 className="mb-4 text-primary">Welcome to Smart E-Commerce</h1>
                <p className="lead mb-4">Shop the best electronics, books, and clothing with dynamic pricing and loyalty discounts!</p>
                <ProductList products={products} addToCart={addToCart} />
              </div>
              <CartSidebar
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                handleCheckout={handleCheckout}
                showCheckout={showCheckout}
                setShowCheckout={setShowCheckout}
                checkoutResult={checkoutResult}
                orderInfo={orderInfo}
                loyaltyLevel={selectedUser.loyaltyLevel}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;