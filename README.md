# ✅ Leave Management System — Frontend (React + TypeScript + Vite + Redux Toolkit)

A **fully implemented, production-ready frontend** for managing employee leaves with complete **authentication**, **role-based access**, **form validation**, **pagination**, **token validation**, and **real-time notifications** — all matching the required specifications.

---

## 📋 Implemented Requirements & Aditional 

| Feature / Requirement | Status | Description |
|------------------------|:------:|-------------|
| Login & Authentication | ✅ | Token-based login with role distinction |
| Role-based Dashboards | ✅ | Separate flows for Employee & Admin |
| Leave CRUD | ✅ | Create, Update, Delete leave requests |
| Pending-only Edit/Delete | ✅ | Enforced in UI and state logic |
| Admin Approve/Reject | ✅ | Dedicated action for status updates |
| Filter by Status | ✅ | Filter by Pending / Approved / Rejected |
| Pagination | ✅ | Client-side pagination for tables |
| Form Validation | ✅ | Required fields and date range validation |
| Token Validation | ✅ | Auto logout on invalid/expired token |
| Notifications | ✅ | Success, error, and action feedback |
| Unit Testing | ✅ | Auth, Leave CRUD, and Validation tests |
| State Management | ✅ | Redux Toolkit + Redux Persist |
| Admin User Registration | ✅ | Register new employees via dashboard |
| Protected Routes | ✅ | Implemented via custom `<ProtectedRoute />` to restrict unauthorized access |
| Token Storage | ✅ | Tokens persisted securely in `localStorage` using Redux Persist |
| Role-based Access Control | ✅ | Dynamic dashboards and route visibility based on user role |
| Conflict-safe Actions | ✅ | Frontend validation prevents overlapping or duplicate actions |
| User Experience Enhancements | ✅ | Toast notifications, inline errors, and responsive design for smooth UX |

---

## 🧠 Tech Stack

- **React 19 + TypeScript + Vite**
- **Redux Toolkit + Redux Persist**
- **React Router v6**
- **Axios** (with token interceptor)
- **React Hook Form** for validation
- **React-Toastify** for notifications
- **Vitest + React Testing Library** for unit testing

---

## 🔐 Authentication Flow

- Designed and implemented a modern **Login Page UI** (based on provided mockup).
- Integrated **Redux Toolkit + Redux Persist** for global auth state.
- **Token-based authentication:**
  - Backend returns a session token upon login.
  - Token persisted to `localStorage`.
  - Automatically appended to every Axios request.
- **Token validation:** auto logout on expired or invalid token.
- Role-based authentication:
  - 👩‍💼 Admin → `admin / admin123`
  - 👨‍💻 Employee → `employee / emp123`

<img width="602" height="505" alt="login" src="https://github.com/user-attachments/assets/610cc1e6-6c9e-44fe-ad1c-0482ba9d7459" />

---

## 🧭 Routing (Protected + Role-based)

- Configured with **React Router v6**.
- `ProtectedRoute` component checks user authentication.
- Routes:
  - `/login` → Public
  - `/dashboard` → Authenticated base
  - `/dashboard/apply` → Apply leave form
  - `/dashboard/review-all` → Leave table
  - `/dashboard/manage-users` → Admin-only user registration
- Role-based rendering ensures Admin and Employee dashboards differ.

<img width="1909" height="784" alt="admin view" src="https://github.com/user-attachments/assets/a4f63d7e-569c-4af0-ba6b-ef69106687c8" />

---

## 📦 State Management (Redux Toolkit + Persist)

- Global state managed by **Redux Toolkit slices**:
  - `authSlice` → login/logout + token handling
  - `leavesSlice` → CRUD operations and filtering
  - `usersSlice` → Admin-only user registration
- **redux-persist** ensures auth state survives refreshes.
- Async thunks handle all API calls cleanly with error handling and toasts.

---

## 📅 Leave Management Module

> ✅ Fully covers the required leave management functionalities.

### Leave Fields:
`fromDate`, `toDate`, `reason`, `status (Pending | Approved | Rejected)`, `employeeName`, `id`

### Employee Flows
- Apply for leave via validated form.
- View all their leaves (stored in state).
- Edit or cancel leave only if status = `Pending`.

### Admin Flows
- View all leaves (with pagination).
- Approve / Reject requests.
- Filter by status.
- Manage employees (create users).

<img width="553" height="319" alt="leaveapply" src="https://github.com/user-attachments/assets/77bd281f-0264-4828-8251-1a59766fffa9" />

---

## ⚙️ Pagination

- Client-side pagination for both Employee and Admin tables.
- Configurable items per page (default: 5–10).
- Pagination state stored in Redux for consistency.
- Integrated seamlessly with filters and search.

<img width="1667" height="590" alt="leave all" src="https://github.com/user-attachments/assets/74f3466d-9225-4b60-9b38-8a8f5f45a80b" />

---

## ✅ Form Validation

- Implemented with **React Hook Form**.
- Ensures:
  - All fields are required.
  - `fromDate ≤ toDate`.
- Instant feedback via inline messages.
- Prevents submission until valid.
<img width="493" height="316" alt="validation" src="https://github.com/user-attachments/assets/aa34f654-cb8a-4988-ab05-136da25fedaf" />

---

## 💬 User Notifications (React-Toastify)

Real-time feedback for:

- ✅ Successful login/logout  
- 📄 Leave creation/update/delete  
- ⚙️ Admin approvals/rejections  
- ❌ Invalid token or unauthorized actions  

<img width="749" height="346" alt="notifications" src="https://github.com/user-attachments/assets/7bc6deda-96ce-400e-b18e-a3305333c463" />

## User Registration
<img width="477" height="335" alt="userregistration" src="https://github.com/user-attachments/assets/c39a407b-cb61-44a4-9c18-493a7bc782e1" />


## 🧪 Unit Testing

Unit tests are implemented using **Jest** and **React Testing Library** to ensure reliability, correct functionality, and maintainable code.  
The tests cover all key areas including authentication, leave CRUD operations, validation, and UI feedback.

### 🔍 Coverage Includes:
- **Authentication Flow** — Valid login/logout, token persistence, and auto logout on expiry.  
- **Leave Module** — Create, update, and delete actions with pending-only restrictions.  
- **Validation** — Checks for required fields and valid date ranges.  
- **UI Feedback** — Toast notifications and conditional button states.  

### ▶️ Run Tests
To execute all unit tests locally:
```bash
npm run test
```

## 🚀 How to Run the Application

### Install Dependencies
Install all required packages before running the app:
```bash
npm install
```
### Launch the React application locally
```bash
npm run dev
```
### Run Unit Tests
```bash
npm run test

```
