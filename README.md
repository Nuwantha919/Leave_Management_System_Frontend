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

<img width="732" height="682" alt="login" src="https://github.com/user-attachments/assets/53ca17ef-bc25-4817-be2e-7ef646af8a7a" />


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

<img width="1902" height="884" alt="admin ui" src="https://github.com/user-attachments/assets/c230a8c1-ac8d-47e7-bee4-f7b65fc34055" />


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

<img width="550" height="396" alt="leave apply" src="https://github.com/user-attachments/assets/5d53a8db-d30a-4631-9a4b-af71263b350a" />



---

## ⚙️ Pagination

- Client-side pagination for both Employee and Admin tables.
- Configurable items per page (default: 5–10).
- Pagination state stored in Redux for consistency.
- Integrated seamlessly with filters and search.

<img width="1678" height="743" alt="review leave" src="https://github.com/user-attachments/assets/aea34d2f-2ffd-488a-a40d-cfc24b5f5461" />


---

## ✅ Form Validation

- Implemented with **React Hook Form**.
- Ensures:
  - All fields are required.
  - `fromDate ≤ toDate`.
- Instant feedback via inline messages.
- Prevents submission until valid.
<img width="568" height="404" alt="validation" src="https://github.com/user-attachments/assets/fcefb4e7-0d97-41ab-82b0-cd049f954eb7" />


---

## 💬 User Notifications (React-Toastify)

Real-time feedback for:

- ✅ Successful login/logout  
- 📄 Leave creation/update/delete  
- ⚙️ Admin approvals/rejections  
- ❌ Invalid token or unauthorized actions  
<img width="1917" height="943" alt="notification" src="https://github.com/user-attachments/assets/6fd0b8f1-6aa3-4b72-b063-8da0fba95487" />



## User Registration
<img width="538" height="417" alt="user register" src="https://github.com/user-attachments/assets/7841c19b-a43c-4cd2-9a77-9a5d09a78212" />



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
