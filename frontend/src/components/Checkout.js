import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Checkout({ cart, loyaltyLevel, setLoyaltyLevel, handleCheckout, checkout, orderInfo }) {
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  if (checkout && orderInfo) {
    return (
      <div className="text-center">
        <h2>Thank you for your order, {orderInfo.name}!</h2>
        <p>Order confirmation sent to: {orderInfo.email}</p>
        <h4>Order Summary</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th><th>Qty</th><th>Base</th><th>Tax</th><th>Discount</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            {checkout.items.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.quantity}</td>
                <td>${i.base.toFixed(2)}</td>
                <td>${i.tax.toFixed(2)}</td>
                <td>${i.discount.toFixed(2)}</td>
                <td>${i.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Subtotal: ${checkout.subtotal.toFixed(2)}</p>
        {checkout.bulkDiscount > 0 && <p>Bulk Discount: -${checkout.bulkDiscount.toFixed(2)}</p>}
        <p>Loyalty Discount: -${checkout.loyaltyDiscount.toFixed(2)}</p>
        <h3>Final Total: ${checkout.finalTotal.toFixed(2)}</h3>
        <Link to="/products" className="btn btn-primary mt-3">Continue Shopping</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div>
        <h2>Your cart is empty.</h2>
        <Link to="/products" className="btn btn-primary">Shop Now</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (form.name && form.email && form.address) {
      handleCheckout(form);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            className="form-control"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            className="form-control"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            className="form-control"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            required
          />
        </div>
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
        <button className="btn btn-success" type="submit">Place Order</button>
        {submitted && (!form.name || !form.email || !form.address) && (
          <div className="text-danger mt-2">Please fill all fields.</div>
        )}
      </form>
      <h4>Order Preview</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Checkout;