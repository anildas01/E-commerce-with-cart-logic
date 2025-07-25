# Smart Shopping Cart – Modern E-Commerce Platform

A modern, full-stack e-commerce demo with dynamic pricing, loyalty discounts, and a beautiful, responsive UI.

---

## 🚀 Features

- **Modern UI:** Responsive, Material UI-based design with a 3-column product grid and full-page cart.
- **Dynamic Pricing:**  
  - Electronics: 10% tax, 15% off if buying more than 2.
  - Books: Tax-free.
  - Clothing: 5% tax.
  - Bulk discount: 10% off if cart > $200.
  - Loyalty discount: Bronze (5%), Silver (10%), Gold (15%).
- **User Profiles:** Switch between 3 demo users (Bronze, Silver, Gold) from the navbar.
- **Per-User Cart:** Each user has their own persistent cart.
- **Full Cart Page:** Click the cart icon to view and checkout on a dedicated, full-screen cart page.
- **Itemized Breakdown:** See base price, tax, item discounts, and all applied discounts in the cart.
- **Add/Remove/Update Cart Items:** Easily manage your cart from the product grid or cart page.

---

## 🛠️ Getting Started

### 1. **Clone the Repository**
```sh
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. **Install Dependencies**

#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd ../frontend
npm install
```

### 3. **Run the App**

#### Start the Backend
```sh
cd backend
npm start
```
By default, the backend runs on [http://localhost:4000](http://localhost:4000).

#### Start the Frontend
```sh
cd ../frontend
npm start
```
The frontend runs on [http://localhost:3000](http://localhost:3000).

---

## 🌟 How to Use

1. **Browse Products:**  
   Products are shown in a modern 3-column grid. Click "Add to Cart" to add items.

2. **Switch Users:**  
   Click the profile icon in the navbar to switch between Alice (Bronze), Bob (Silver), and Carol (Gold). Each user has their own cart and loyalty level.

3. **View Cart:**  
   - Use the sidebar cart for quick access.
   - Click the cart icon in the navbar to open the full cart page.

4. **Checkout:**  
   - On the cart page, fill in your name, email, and address, then place your order.
   - See a detailed breakdown of all discounts and taxes applied.

5. **Dynamic Pricing:**  
   - Add more electronics to see item-specific discounts.
   - Add enough items to trigger the bulk discount.
   - Switch users to see different loyalty discounts.

---

## 📦 Project Structure

```
backend/    # Node.js/Express backend (API, pricing logic)
frontend/   # React frontend (UI, routing, state)
```

---

## 📝 Customization

- Add more products or categories in the backend.
- Adjust discount rules in `backend/cartLogic.js`.
- Style the UI further using Material UI or your own CSS.

---
