import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, removeFromCart, updateQuantity, loyaltyLevel, setLoyaltyLevel }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2 className="mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">Shop Now</Link>
        </div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} width={40} className="me-2" />
                    {item.name}
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{ width: 60 }}
                    />
                  </td>
                  <td>${item.price}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-3">
            <label className="form-label">Loyalty Level:</label>
            <select
              className="form-select"
              value={loyaltyLevel}
              onChange={e => setLoyaltyLevel(e.target.value)}
              style={{ width: 200 }}
            >
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
            </select>
          </div>
          <h5>Total: ${total.toFixed(2)}</h5>
          <Link to="/checkout" className="btn btn-success mt-3">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
}

export default Cart;