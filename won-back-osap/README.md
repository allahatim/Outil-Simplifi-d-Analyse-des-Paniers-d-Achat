
# Backend API for Outil Simplifié d'Analyse des Paniers d'Achat

This is the backend API for the Outil Simplifié d'Analyse des Paniers d'Achat project, which provides endpoints for analyzing shopping cart data.

## Features

- Import and manage product and sales data.
- Generate analytics for sales, top products, and category trends.
- Swagger documentation for API endpoints.

## Technologies Used
- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Nodemon**
- **Swagger UI** for API documentation

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/allahatim/Outil-Simplifi-d-Analyse-des-Paniers-d-Achat.git
   ```

2. Navigate to the project directory:
   ```bash
   cd won-back-osap
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Environment variables:
   - Create a `.env` file in the root directory with the following variables:
     ```
     DATABASE_URL=your_mongo_database_uri
     ```

## Available Scripts

- **`import-sales`**: Import sales data.
  ```bash
  npm run import-sales
  ```

- **`import-products`**: Import products data.
  ```bash
  npm run import-products
  ```

- **`start`**: Start the production server.
  ```bash
  npm start
  ```

- **`dev`**: Start the development server with TypeScript compiler and nodemon.
  ```bash
  npx nodemon dist/app.js
  ```

## API Documentation

The API documentation is available through Swagger UI at:
```
http://localhost:3000/api-docs
```

## Endpoints

- **`/api/sales/total/:period`**: Get total sales for a specific period (`7_days`, `30_days`, `12_months`).
- **`/api/sales/top-products/:period`**: Get the top-selling products for a specific period.
- **`/api/sales/category/:period`**: Get sales by category for a specific period.
- **`/api/products/details/:period`**: Get product details for a specific period.

