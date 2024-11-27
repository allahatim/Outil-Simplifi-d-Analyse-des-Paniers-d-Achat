
# Outil Simplifié d'Analyse des Paniers d'Achat

## Description
The **Outil Simplifié d'Analyse des Paniers d'Achat** is a project that includes a backend API and a frontend application for analyzing shopping cart data. It allows users to import and manage product and sales data, while generating useful analytics such as total sales, top-selling products, and sales by category.

## Project Structure

This repository contains two main parts:
- **Backend**: The API server built with Node.js, Express, TypeScript, and MongoDB.
- **Frontend**: A user interface built with Vue.js to interact with the API.

---

### Backend API

#### Features
- Import and manage product and sales data.
- Generate analytics for sales, top products, and category trends.
- Swagger UI for API documentation.

#### Technologies Used
- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Swagger UI**

#### Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/allahatim/Outil-Simplifi-d-Analyse-des-Paniers-d-Achat.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd won-back-osap
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and define your environment variables:
   ```
   DATABASE_URL=your_mongo_database_uri
   ```

#### Available Scripts

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

#### API Documentation

The API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

**Endpoints:**
- `/api/sales/total/:period`: Get total sales for a specific period (`7_days`, `30_days`, `12_months`).
- `/api/sales/top-products/:period`: Get the top-selling products for a specific period.
- `/api/sales/category/:period`: Get sales by category for a specific period.
- `/api/products/details/:period`: Get product details for a specific period.

---

### Frontend (Vue.js)

#### Prérequis
- **Node.js**

#### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/allahatim/Outil-Simplifi-d-Analyse-des-Paniers-d-Achat.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd won-front-osap
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

#### Running the Application

To run the frontend application in development mode, execute the following command:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## General Notes

- **Frontend and Backend Integration**: Ensure that the backend API is running (on port `3000` by default) when testing the frontend.
- **Swagger Documentation**: The backend provides Swagger documentation to interact with the API at `http://localhost:3000/api-docs`.
