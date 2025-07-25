import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

function CartSidebar({
  cart,
  removeFromCart,
  updateQuantity,
  loyaltyLevel,
  setLoyaltyLevel,
  handleCheckout,
  showCheckout,
  setShowCheckout,
  checkoutResult,
  orderInfo,
  fullPage
}) {
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);
  const [breakdown, setBreakdown] = useState(null);

  // Fetch price breakdown whenever cart or loyaltyLevel changes
  useEffect(() => {
    if (cart.length === 0) {
      setBreakdown(null);
      return;
    }
    fetch('http://localhost:4000/cart/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, customer: { loyaltyLevel } })
    })
      .then(res => res.json())
      .then(setBreakdown);
  }, [cart, loyaltyLevel]);

  if (showCheckout && checkoutResult && orderInfo) {
    return (
      fullPage ? (
        <Box sx={{ width: '100vw', minHeight: '100vh', pt: '64px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', p: 0, m: 0, background: '#fff' }}>
          <div style={{ width: '100%', maxWidth: 600, padding: 36 }}>
            <h4 className="text-success">Thank you, {orderInfo.name}!</h4>
            <p>Order confirmation sent to: <b>{orderInfo.email}</b></p>
            <h6>Order Summary</h6>
            <ul className="list-group mb-2">
              {checkoutResult.items.map(i => (
                <li className="list-group-item" key={i.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{i.name} x{i.quantity}</span>
                    <span>${i.total.toFixed(2)}</span>
                  </div>
                  <div className="small text-muted ms-2">
                    Base: ${i.base.toFixed(2)} | Tax: ${i.tax.toFixed(2)} | Item Discount: -${i.discount.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mb-2">Subtotal: ${checkoutResult.subtotal.toFixed(2)}</div>
            {checkoutResult.bulkDiscount > 0 && <div className="mb-2">Bulk Discount: -${checkoutResult.bulkDiscount.toFixed(2)}</div>}
            <div className="mb-2">Loyalty Discount: -${checkoutResult.loyaltyDiscount.toFixed(2)}</div>
            <h5 className="text-primary">Final Total: ${checkoutResult.finalTotal.toFixed(2)}</h5>
            <button className="btn btn-outline-primary mt-3" onClick={() => setShowCheckout(false)}>
              Continue Shopping
            </button>
          </div>
        </Box>
      ) : (
        <Box sx={{ width: 320, height: '100vh', position: 'sticky', top: 0 }}>
          <div className="card shadow-sm p-3 cart-sidebar" style={{ height: '100%', overflowY: 'auto' }}>
            <h4 className="text-success">Thank you, {orderInfo.name}!</h4>
            <p>Order confirmation sent to: <b>{orderInfo.email}</b></p>
            <h6>Order Summary</h6>
            <ul className="list-group mb-2 cart-scroll-area">
              {checkoutResult.items.map(i => (
                <li className="list-group-item" key={i.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{i.name} x{i.quantity}</span>
                    <span>${i.total.toFixed(2)}</span>
                  </div>
                  <div className="small text-muted ms-2">
                    Base: ${i.base.toFixed(2)} | Tax: ${i.tax.toFixed(2)} | Item Discount: -${i.discount.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mb-2">Subtotal: ${checkoutResult.subtotal.toFixed(2)}</div>
            {checkoutResult.bulkDiscount > 0 && <div className="mb-2">Bulk Discount: -${checkoutResult.bulkDiscount.toFixed(2)}</div>}
            <div className="mb-2">Loyalty Discount: -${checkoutResult.loyaltyDiscount.toFixed(2)}</div>
            <h5 className="text-primary">Final Total: ${checkoutResult.finalTotal.toFixed(2)}</h5>
            <button className="btn btn-outline-primary mt-3" onClick={() => setShowCheckout(false)}>
              Continue Shopping
            </button>
          </div>
        </Box>
      )
    );
  }

  return (
    fullPage ? (
      <Box sx={{ width: '100vw', minHeight: '100vh', pt: '64px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', p: 0, m: 0, background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 600, padding: 36 }}>
          <h4 className="mb-3">Your Cart</h4>
          <div>
            {cart.length === 0 ? (
              <div className="text-muted">Cart is empty.</div>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {cart.map(item => (
                    <li className="list-group-item d-flex align-items-center" key={item.id}>
                      <img src={item.image} alt={item.name} width={40} className="me-2 rounded" />
                      <div className="flex-grow-1">
                        <div>{item.name}</div>
                        <div className="small text-muted">${item.price} x </div>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                          style={{ width: 50 }}
                        />
                      </div>
                      <button className="btn btn-sm btn-danger ms-2" onClick={() => removeFromCart(item.id)}>
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mb-2">
                  <div className="small text-muted">Loyalty Level: <b>{loyaltyLevel}</b> (set by user profile)</div>
                </div>
                {/* Price Breakdown */}
                {breakdown && (
                  <div className="mb-3">
                    <div>Subtotal: <b>${breakdown.subtotal.toFixed(2)}</b></div>
                    {breakdown.items && (
                      <ul className="list-group mb-2">
                        {breakdown.items.map(i => (
                          <li className="list-group-item" key={i.id}>
                            <div className="d-flex justify-content-between align-items-center">
                              <span>{i.name} x{i.quantity}</span>
                              <span>${i.total.toFixed(2)}</span>
                            </div>
                            <div className="small text-muted ms-2">
                              Base: ${i.base.toFixed(2)} | Tax: ${i.tax.toFixed(2)} | Item Discount: -${i.discount.toFixed(2)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    {breakdown.bulkDiscount > 0 && (
                      <div>Bulk Discount: <span className="text-success">-${breakdown.bulkDiscount.toFixed(2)}</span></div>
                    )}
                    <div>Loyalty Discount: <span className="text-success">-${breakdown.loyaltyDiscount.toFixed(2)}</span></div>
                    <div className="mt-2 fs-5">Final Total: <b>${breakdown.finalTotal.toFixed(2)}</b></div>
                  </div>
                )}
                <hr />
                <form onSubmit={e => {
                  e.preventDefault();
                  setSubmitted(true);
                  if (form.name && form.email && form.address) {
                    handleCheckout(form);
                  }
                }}>
                  <h6>Checkout</h6>
                  <input
                    className="form-control mb-2"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Address"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    required
                  />
                  {submitted && (!form.name || !form.email || !form.address) && (
                    <div className="text-danger mb-2">Please fill all fields.</div>
                  )}
                  <button className="btn btn-success w-100" type="submit">Place Order</button>
                </form>
              </>
            )}
          </div>
        </div>
      </Box>
    ) : (
      <Box sx={{ width: 320, height: '100vh', position: 'sticky', top: 0 }}>
        <div className="card shadow-sm p-3 cart-sidebar" style={{ height: '100%', overflowY: 'auto' }}>
          <h4 className="mb-3">Your Cart</h4>
          <div className="cart-scroll-area">
            {cart.length === 0 ? (
              <div className="text-muted">Cart is empty.</div>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {cart.map(item => (
                    <li className="list-group-item d-flex align-items-center" key={item.id}>
                      <img src={item.image} alt={item.name} width={40} className="me-2 rounded" />
                      <div className="flex-grow-1">
                        <div>{item.name}</div>
                        <div className="small text-muted">${item.price} x </div>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                          style={{ width: 50 }}
                        />
                      </div>
                      <button className="btn btn-sm btn-danger ms-2" onClick={() => removeFromCart(item.id)}>
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mb-2">
                  <div className="small text-muted">Loyalty Level: <b>{loyaltyLevel}</b> (set by user profile)</div>
                </div>
                {/* Price Breakdown */}
                {breakdown && (
                  <div className="mb-3">
                    <div>Subtotal: <b>${breakdown.subtotal.toFixed(2)}</b></div>
                    {breakdown.items && (
                      <ul className="list-group mb-2">
                        {breakdown.items.map(i => (
                          <li className="list-group-item" key={i.id}>
                            <div className="d-flex justify-content-between align-items-center">
                              <span>{i.name} x{i.quantity}</span>
                              <span>${i.total.toFixed(2)}</span>
                            </div>
                            <div className="small text-muted ms-2">
                              Base: ${i.base.toFixed(2)} | Tax: ${i.tax.toFixed(2)} | Item Discount: -${i.discount.toFixed(2)}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    {breakdown.bulkDiscount > 0 && (
                      <div>Bulk Discount: <span className="text-success">-${breakdown.bulkDiscount.toFixed(2)}</span></div>
                    )}
                    <div>Loyalty Discount: <span className="text-success">-${breakdown.loyaltyDiscount.toFixed(2)}</span></div>
                    <div className="mt-2 fs-5">Final Total: <b>${breakdown.finalTotal.toFixed(2)}</b></div>
                  </div>
                )}
                <hr />
                <form onSubmit={e => {
                  e.preventDefault();
                  setSubmitted(true);
                  if (form.name && form.email && form.address) {
                    handleCheckout(form);
                  }
                }}>
                  <h6>Checkout</h6>
                  <input
                    className="form-control mb-2"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Address"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    required
                  />
                  {submitted && (!form.name || !form.email || !form.address) && (
                    <div className="text-danger mb-2">Please fill all fields.</div>
                  )}
                  <button className="btn btn-success w-100" type="submit">Place Order</button>
                </form>
              </>
            )}
          </div>
        </div>
      </Box>
    )
  );
}

export default CartSidebar;