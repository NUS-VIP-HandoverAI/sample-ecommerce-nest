# NestJS E-Commerce Sample Backend

This is a small sample NestJS backend for an e-commerce app. It uses in-memory data so you can run it immediately without a database.

## Features

- Product catalog with category and search filters
- Customer lookup
- Cart management per customer
- Checkout flow that turns a cart into an order
- Request validation with Nest pipes

## Quick Start

```bash
npm install
npm run start:dev
```

The API runs on `http://localhost:3000` by default.

## Example Endpoints

```bash
GET    /health
GET    /products
GET    /products/:id
POST   /products
GET    /customers
GET    /customers/:id
GET    /carts/:customerId
POST   /carts/:customerId/items
DELETE /carts/:customerId/items/:productId
GET    /orders
GET    /orders/:id
POST   /orders/checkout
```

## Sample Requests

Add an item to a cart:

```bash
curl -X POST http://localhost:3000/carts/cust-1001/items \
  -H "Content-Type: application/json" \
  -d "{\"productId\":\"prod-1001\",\"quantity\":2}"
```

Checkout a cart:

```bash
curl -X POST http://localhost:3000/orders/checkout \
  -H "Content-Type: application/json" \
  -d "{\"customerId\":\"cust-1001\",\"shippingAddress\":\"12 Orchard Road, Singapore\",\"paymentMethod\":\"card\"}"
```

## Notes

- Data resets whenever the server restarts.
- This sample is designed to be easy to extend with a real database like PostgreSQL plus Prisma or TypeORM.
