# Leave Management System — Frontend (React + TypeScript + Vite + Redux Toolkit)

A modern, production-ready frontend for managing employee leaves with **login/session handling**, **role-based UI**, **form validation**, **pagination**, **token validation**, and **real-time toast notifications**.  
Pairs with the **Spring Boot + MySQL backend** in the companion repository.

> **Tech Stack:** React 19, TypeScript, Vite, React Router, Redux Toolkit, Redux Persist, Axios, React Hook Form, React-Toastify, Vitest + React Testing Library.

---

## ✨ Features Overview

### 🔐 Authentication Flow
- Login page (UI based on the provided design)
- Token-based authentication — stored in Redux & persisted in `localStorage`
- Token is automatically attached to all authenticated API calls
- Token validation:
  - On each app load, the token is checked.
  - If expired or invalid, the user is logged out and redirected to `/login`.
- Sample credentials:
  - **Employee:** `employee / emp123`
  - **Admin:** `admin / admin123`

<img width="602" height="505" alt="login" src="https://github.com/user-attachments/assets/610cc1e6-6c9e-44fe-ad1c-0482ba9d7459" />

---

### 🧭 Routing
- **Public route:** `/login`
- **Protected routes:** `/dashboard`, `/dashboard/apply`, `/dashboard/review-all`, `/dashboard/manage-users`, etc.
- Guarded by a custom `<ProtectedRoute />` that checks authentication.
- Role-based navigation — different menu options for `ADMIN` and `EMPLOYEE`.

<img width="1909" height="784" alt="admin view" src="https://github.com/user-attachments/assets/a4f63d7e-569c-4af0-ba6b-ef69106687c8" />

---

### 📦 State Management (Redux Toolkit)
- `auth` slice → login/logout, token handling, session persistence  
- `leaves` slice → CRUD operations on leaves  
- `users` slice → (Admin) user registration  
- `redux-persist` → persists only `auth` slice (for token + user info)
- Async thunks using **Axios** for API calls.

---

### 📅 Leave Management
- Fields: `fromDate`, `toDate`, `reason`, `status (Pending | Approved | Rejected)`, `employeeName`, `id`
- **Employee Flows:**
  - Apply for leave (validated form)
  - View & paginate their leave requests
  - Edit or cancel leaves only when status is `Pending`
- **Admin Flows:**
  - View all leaves (paginated)
  - Approve / Reject leave requests
  - Filter by status (`Pending / Approved / Rejected`)
  - Register employees (via `/manage-users`)

---

### ⚙️ Pagination
- Simple, responsive pagination on leave tables for both roles.
- Configurable page size (default: 5 or 10 records per page).
- Pagination state stored in Redux to persist between navigations.

---

### 💬 User Notifications (React-Toastify)
Real-time toast notifications for:

- ✅ Successful login / logout
- 📄 Leave creation, update, or deletion
- ⚙️ Admin actions (approve/reject)
- ❌ Invalid token or unauthorized access

```tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<ToastContainer
  position="bottom-right"
  autoClose={4000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>
