# eCommerce API Services

## Description
eCommerce API Services is a robust backend application designed to facilitate the management of an online store. It enables user registration, authentication, and 
profile management while providing functionalities for managing products, categories, and orders. This API is crafted to support both users and administrators, allowing 
for role-based access control and a seamless shopping experience. It is intended to be integrated with a frontend application in the future.

## Features
- **User Management**: 
  - User registration and authentication with secure password handling.
  - Role-based access control (admin and user roles).
  - User profile management, including addresses and order history.
  - Shopping cart management, allowing users to add products and view total prices.

- **Shopping Cart**: 
  - Users can add products to their cart with specified quantities.
  - Automatic calculation of the total price in the cart.
  - Ability to update item quantities and remove items from the cart.

- **Product Management**: 
  - CRUD operations for products with details such as name, description, price, and stock.
  - Ability to associate products with categories.
  - Review and rating system for products, with average rating calculation.

- **Reviews and Ratings**: 
  - Users can leave reviews and ratings for products.
  - Each product maintains an average rating and review count.
  - Ability to view all reviews for a product, enhancing the decision-making process for users.

- **Order Management**: 
  - Creation of orders that capture user purchases, quantities, and total amounts.
  - Management of order statuses (Pending, Shipped, Delivered, Cancelled).
  - Storage of shipping and billing addresses for each order.
  - Ability to add payment methods and order notes.

- **Category Management**: 
  - CRUD operations for categories, allowing organization of products.

- **Security Features**: 
  - JWT-based authentication for secure access to API endpoints.

- **Documentation**: 
  - Comprehensive API documentation provided via Swagger, detailing all available endpoints and their usage.

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: ODM for MongoDB
- **JSON Web Tokens (JWT)**: For user authentication and authorization
- **Swagger**: API documentation

## Installation Instructions
To run this project locally, follow these steps:

1. Clone the repository:
  ```
git clone https://github.com/GunarajKhatri/ecommerce-api-services.git
  ```
2. Navigate into the project directory:
 ```
cd ecommerce-api-services
```
3. Install the dependencies:
```
npm install
```
4. Create a .env file in the root directory and add your environment variables as shown in .env.example.
  
6. Now start the server:
```
npm run dev
```
## Docker setup
If you prefer running the application with Docker, follow these steps:

1. Make sure you follow step no.1 and step no.2 from above installation guide and also docker should be installed and running on your machine.

2. Use the following command to build and run your containers:
```
docker-compose up --build
```
3. Once the Docker containers are running, the application will be accessible at http://localhost:5000 (or whatever port you have configured in the docker-compose.yml file).

# Usage

## API Endpoints
For API Endpints, visit the url:
```
http://localhost:5000/api-docs
```
# Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

