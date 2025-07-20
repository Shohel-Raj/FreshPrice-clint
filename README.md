# 🛒 FreshPrice - Local Market Price Tracker 

FreshPrice is a full-stack web application that enables users to explore, compare, and purchase fresh produce directly from local markets in Bangladesh. Built using React 19, Tailwind CSS, Firebase, MongoDB, Stripe, and JWT-based authentication, the app supports role-based dashboards for Admin, Vendors, and Users.

---

## 🚀 Live Demo

🌐 [Fresh Price](https://price-tracker-local.web.app/)  


---

## 🧰 Tech Stack

- **Frontend:** React 19, Tailwind CSS, DaisyUI, Framer Motion, Recharts, React Router, React Hook Form
- **Backend:** Node.js, Express.js, MongoDB, JWT Auth, Stripe Payment
- **Auth:** Firebase Auth, Google Login, JWT (localStorage-based)
- **UI Libraries:** Heroicons, Lucide, Headless UI, React Toastify, React Icons
- **Tools:** Axios, React Query, Vite, React Spinners

---

## ✨ Features

### ✅ Public Pages
- **Home Page**
  - Navbar with dynamic auth-based buttons
  - Animated Banner section (Framer Motion)
  - Product Section showing latest approved products (limit 6)
  - Advertisement Carousel (dynamic from DB)
  - Two additional custom animated sections
  - Footer with contact info & social links

- **All Products Page**
  - View all approved products
  - Filters: By date or date range
  - Sorting: Price low-to-high & high-to-low
  - Backend-based filtering & pagination

### 🔐 Authentication & Authorization
- Firebase Auth with JWT (localStorage)
- Social login (Google) — default role: user
- Role-based access control for Admin, Vendor, and User
- PrivateRoute implementation for protected views

---

## 📄 Product Details Page (Private)
- Market name, image, date, and item list with prices
- Vendor info and user reviews
- ⭐ Add to Watchlist (disabled for Admin/Vendor)
- 🛒 Buy Product → Stripe Payment → Order save
- 📊 Price comparison chart using Recharts
- 💬 User review system with star rating and feedback

---

## 👤 User Dashboard
- 📈 Price Trends (visualized via Recharts)
- 🧾 Watchlist management (add/remove with modals)
- 🛍️ Order list with “View Details” button

---

## 🧑‍🌾 Vendor Dashboard
- 📝 Add Product form with full validation and multiple prices
- 📄 My Products table: update, delete, see status (pending/approved/rejected)
- ✉️ Rejection feedback visible to vendor
- 📢 Add & Manage Advertisements with update/delete modals

---

## 🛠️ Admin Dashboard
- 👥 All Users: role update + backend search (name/email)
- 📋 All Products: approve/reject (with modal), update, delete
- 📢 All Ads: view, update status, delete
- 🛒 All Orders: view user purchases
- 👥 All Vendor: Verified + reject vendor

---