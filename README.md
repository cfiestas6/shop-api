# Shop-API

## Overview
Shop-API is a RESTful API built with Node.js, Express.js, and MongoDB. It features JWT authentication, CORS handling, and robust security measures. The API supports CRUD operations for products and orders, and user authentication.

## Key Features
- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **CORS Handling**: Cross-Origin Resource Sharing setup for API accessibility.
- **Security**: Implementation of security best practices.
- **CRUD Operations**: Create, Read, Update, and Delete functionality for products and orders.

## Components
- **Controllers**: Business logic for handling requests ([Auth](https://github.com/cfiestas6/shop-api/blob/main/api/controllers/auth.js), [Orders](https://github.com/cfiestas6/shop-api/blob/main/api/controllers/orders.js), [Products](https://github.com/cfiestas6/shop-api/blob/main/api/controllers/products.js)).
- **Models**: Mongoose schemas for [Order](https://github.com/cfiestas6/shop-api/blob/main/api/models/order.js), [Product](https://github.com/cfiestas6/shop-api/blob/main/api/models/product.js), and [User](https://github.com/cfiestas6/shop-api/blob/main/api/models/user.js).
- **Routes**: Express routes for handling API endpoints ([Orders](https://github.com/cfiestas6/shop-api/blob/main/api/routes/orders.js), [Products](https://github.com/cfiestas6/shop-api/blob/main/api/routes/products.js), [User](https://github.com/cfiestas6/shop-api/blob/main/api/routes/user.js)).
- **Middleware**: Custom middleware for authentication and error handling.

## Setup and Installation
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Set environment variables for MongoDB connection and JWT secret key.
4. Start the server:
   ```
   npm start
   ```

## API Endpoints
- **User Authentication**: Sign up, log in, and account deletion.
- **Products**: CRUD operations for products.
- **Orders**: CRUD operations for orders.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Bcrypt for password hashing
