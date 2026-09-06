# DineEase API Documentation

This document outlines the primary REST API endpoints available in the DineEase backend.

## Base URL
All API endpoints are prefixed with `/api` (e.g., `http://localhost:5000/api`). 
There is also a public health check at `GET /api/health` and a root endpoint at `GET /`.

---

## 1. Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| POST | `/auth/register` | Register a new customer account | No | Any |
| POST | `/auth/login` | Log in and receive a JWT | No | Any |
| POST | `/auth/logout` | Log out and clear cookies | No | Any |
| GET | `/auth/me` | Get current user profile | Yes | Any |
| PATCH | `/auth/me` | Update current user profile | Yes | Any |
| PATCH | `/auth/password` | Change current user password | Yes | Any |

---

## 2. Menu (`/menu-items`, `/categories`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| GET | `/categories` | Get all menu categories | No | Any |
| POST | `/categories` | Create a new menu category | Yes | Admin |
| PATCH | `/categories/:id` | Update a menu category | Yes | Admin |
| DELETE | `/categories/:id` | Delete a menu category | Yes | Admin |
| GET | `/menu-items` | Get all menu items with search/filter | No | Any |
| GET | `/menu-items/:id` | Get single menu item details | No | Any |
| POST | `/menu-items` | Create a new menu item | Yes | Admin |
| PATCH | `/menu-items/:id` | Update an existing menu item | Yes | Admin |
| PATCH | `/menu-items/:id/availability` | Toggle menu item availability | Yes | Admin |
| DELETE | `/menu-items/:id` | Delete a menu item | Yes | Admin |

---

## 3. Tables (`/tables`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| GET | `/tables/available` | Check table availability | Yes | Any |
| GET | `/tables` | Get all tables and their statuses | Yes | Admin, Waiter, Cleaner |
| POST | `/tables` | Add a new table | Yes | Admin |
| PATCH | `/tables/:id` | Update table details/status | Yes | Admin |
| PATCH | `/tables/:id/disable` | Disable a table | Yes | Admin |
| PATCH | `/tables/:id/enable` | Enable a table | Yes | Admin |

---

## 4. Reservations (`/reservations`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| POST | `/reservations` | Create a new reservation | Yes | Any |
| GET | `/reservations/my` | Get user's reservation history | Yes | Any |
| PATCH | `/reservations/:id/cancel` | Cancel a reservation | Yes | Any |
| GET | `/reservations` | Get all reservations | Yes | Admin, Waiter |
| PATCH | `/reservations/:id/approve` | Approve a reservation | Yes | Admin, Waiter |
| PATCH | `/reservations/:id/reject` | Reject a reservation | Yes | Admin, Waiter |
| GET | `/reservations/:id` | Get reservation details | Yes | Any |

---

## 5. Orders (`/orders`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| POST | `/orders` | Create a new order | Yes | Any |
| GET | `/orders/my` | Get user's order history | Yes | Any |
| GET | `/orders` | Get all active orders | Yes | Admin, Waiter |
| PATCH | `/orders/:id/status` | Update order status | Yes | Admin, Waiter |
| GET | `/orders/:id` | Get specific order details | Yes | Any |

---

## 6. Favourites (`/favourites`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| GET | `/favourites` | Get user's favorite menu items | Yes | Any |
| POST | `/favourites` | Add item to favorites | Yes | Any |
| DELETE | `/favourites/:menuItemId` | Remove item from favorites | Yes | Any |

---

## 7. Reviews (`/reviews`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| GET | `/reviews` | Get all reviews | No | Any |
| GET | `/reviews/my` | Get user's reviews | Yes | Customer |
| POST | `/reviews` | Submit a new review | Yes | Customer |
| PATCH | `/reviews/:id` | Update a review | Yes | Customer |
| DELETE | `/reviews/:id` | Delete a review | Yes | Customer |

---

## 8. Notifications (`/notifications`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| GET | `/notifications` | Get user's notifications | Yes | Any |
| PATCH | `/notifications/read-all` | Mark all notifications as read | Yes | Any |
| PATCH | `/notifications/:id/read` | Mark specific notification as read | Yes | Any |

---

## 9. Cleaning (`/cleaning`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| PATCH | `/cleaning/reservations/:id/complete` | Complete dining & trigger cleaning | Yes | Admin, Waiter |
| GET | `/cleaning/tasks` | Get all cleaning tasks | Yes | Admin, Cleaner |
| POST | `/cleaning/tasks` | Assign a manual cleaning task | Yes | Admin |
| PATCH | `/cleaning/tasks/:id/start` | Start a cleaning task | Yes | Cleaner |
| PATCH | `/cleaning/tasks/:id/ready` | Mark table as cleaned and ready | Yes | Cleaner |

---

## 10. Staff (`/staff`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| GET | `/staff` | Get all staff members | Yes | Admin |
| POST | `/staff` | Create a new staff account | Yes | Admin |
| PATCH | `/staff/:id` | Update staff details | Yes | Admin |
| PATCH | `/staff/:id/disable` | Deactivate staff account | Yes | Admin |
| PATCH | `/staff/:id/enable` | Reactivate staff account | Yes | Admin |

---

## 11. Payments & Refunds (`/payments`, `/refunds`, `/invoices`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| POST | `/payments` | Process a payment | Yes | Any |
| GET | `/payments/my` | Get user's payment history | Yes | Any |
| POST | `/refunds` | Request a refund for an order | Yes | Customer |
| GET | `/refunds/my` | Get user's refund requests | Yes | Customer |
| GET | `/refunds` | Get all refund requests | Yes | Admin |
| POST | `/refunds/:id/process` | Approve and process a refund | Yes | Admin |
| POST | `/refunds/:id/reject` | Reject a refund request | Yes | Admin |
| GET | `/invoices/my` | Get user's invoices | Yes | Any |
| GET | `/invoices/:id` | Get digital invoice details | Yes | Any |

---

## 12. Loyalty (`/loyalty`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| GET | `/loyalty` | Get user's current loyalty point balance | Yes | Customer |

---

## 13. Admin Dashboard & Reports (`/admin`)

| Method | Endpoint | Description | Auth Required | Allowed Roles |
|--------|----------|-------------|---------------|---------------|
| GET | `/admin/dashboard` | Get high-level dashboard metrics | Yes | Admin |
| GET | `/admin/reports` | Generate detailed analytics reports | Yes | Admin |

---

## Common Error Responses

| Status Code | Description | Example Payload |
|-------------|-------------|-----------------|
| `400 Bad Request` | Missing or invalid parameters | `{ "success": false, "message": "Invalid email format" }` |
| `401 Unauthorized` | Missing or invalid JWT token | `{ "success": false, "message": "Not authorized to access this route" }` |
| `403 Forbidden` | User lacks required role permissions | `{ "success": false, "message": "User role Customer is not authorized" }` |
| `404 Not Found` | Requested resource does not exist | `{ "success": false, "message": "Resource not found with id of X" }` |
| `500 Server Error` | Unexpected backend failure | `{ "success": false, "message": "Server Error" }` |
