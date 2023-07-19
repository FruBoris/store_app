# Store App Backend

The Store Backend is a Node.js application that serves as the backend server for an online store. It provides API endpoints for user authentication and CRUD operations for managing products.

## Features

- User registration with JWT authentication.
- User login with JWT token generation.
- Fetch a list of all products.
- Get a specific product by ID.
- Create a new product (requires authentication).
- Update an existing product (requires authentication).
- Delete a product (requires authentication).
- Fetch a list of all users (requires authentication).

## Prerequisites

- Node.js (v12 or higher)
- PostgreSQL database

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/username/store_app.git
   cd store_app
2. Install dependencies
    ```bash 
    npm install
3. Set up the PostgreSQL database:
    Install PostgreSQL on your system.
    Create a new database and user for the application.
    Set the database connection URL in the .env file.
4. Create .env file:
    Create a .env file in the root of the project and set the following variables:
    ```bash
    # Database link
    DB_URL=postgres://username:password@host:5432/db_name
    JWT_SECRET='your-jwt-secret'

    # DB credentials
    DB_NAME='db_name'
    DB_USER='username'
    DB_PASSWORD='password'
    DB_HOST=host
    DB_PORT=5432 (default_port)

    # Server 
    SERVER_PORT=3002 ( server_port)

    Replacing the 'db_name', 'username', 'password', 'host' etc with the actual values
