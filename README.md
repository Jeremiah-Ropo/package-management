
# Package Management System

A GraphQL-based package management system with authentication, CRUD operations, and role-based access control.

## Features
- User registration and authentication (with JWT).
- CRUD operations for managing packages.
- Role-based access control for creating, updating, and deleting packages.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Environment Variables](#environment-variables)
3. [GraphQL Schema](#graphql-schema)
4. [Common Queries and Mutations](#common-queries-and-mutations)
5. [Authorization](#authorization)
6. [Example Requests](#example-requests)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Jeremiah-Ropo/package-management.git
   cd package-management
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env` file and configure the following variables:
   ```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

4. Start the server:
   ```bash
   yarn start
   ```

5. Access GraphiQL at https://package-management-e57ef6a650d0.herokuapp.com/graphql.

## Environment Variables
| Variable       | Description                       |
|----------------|-----------------------------------|
| `MONGO_URI`    | MongoDB connection string         |
| `JWT_SECRET`   | Secret key for JWT authentication |
| `PORT`         | Port number for the server        |

## GraphQL Schema
### Queries
- **packages**: Get all packages.
- **packages(id: ID)**: Get a package by its ID.
- **user**: Get the currently authenticated user's information.

### Mutations
- **register**: Register a new user.
- **login**: Log in a user and receive a JWT token.
- **createPackage**: Create a new package (Admin only).
- **updatePackage**: Update an existing package (Authenticated user only).
- **deletePackage**: Delete a package by ID (Authenticated user only).

## Common Queries and Mutations

### Register a New User
```graphql
mutation {
  register(
    name: "Jeremiah Patrick",
    email: "jeremiah@gmail.com",
    password: "mypassword123",
    role: "user"
  ) {
    id
    name
    email,
    role,
    token
  }
}
```

### Log in a User
```graphql
mutation {
  login(
    email: "jeremiah@gmail.com",
    password: "mypassword123"
  ) {
    token
    user {
      id
      name
      email
      role
    }
  }
}
```

### Create a Package (Admin Only)
```graphql
mutation {
  createPackage(
    name: "Premium Package",
    description: "Access to premium features.",
    price: 99.99,
    expirationDate: "2025-12-31"
  ) {
    id
    name
    description
    price
    expirationDate
  }
}
```

### Update a Package (Admin Only)
```graphql
mutation {
  updatePackage(
    id: "63fa9f1b1234567890abcd12",
    name: "Updated Package Name",
    description: "Updated description",
    price: 199.99
  ) {
    id
    name
    description
    price
  }
}
```

### Delete a Package (Admin Only)
```graphql
mutation {
  deletePackage(id: "63fa9f1b1234567890abcd12")
}
```

### Fetch All Packages
```graphql
query {
  packages {
    id
    name
    description
    price
    expirationDate
  }
}
```

### Fetch a Package by ID
```graphql
query {
  package(id: "63fa9f1b1234567890abcd12") {
    id
    name
    description
    price
    expirationDate
  }
}
```

### Fetch Current User Info
```graphql
query {
  user {
    id
    name
    email
    role
  }
}
```

## Authorization

### Adding Authorization Headers in GraphiQL
When making requests that require authentication, include the `Authorization` header with your JWT token:

1. Open the **"Headers"** tab in GraphiQL.
2. Add the following:
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

## Example Error Responses

### Unauthorized Access
```json
{
  "errors": [
    {
      "message": "Unauthorized",
      "statusCode": 401,
      "path": ["createPackage"]
    }
  ]
}
```

### Forbidden Access
```json
{
  "errors": [
    {
      "message": "Forbidden: You don't have permission to perform this action.",
      "statusCode": 403,
      "path": ["createPackage"]
    }
  ]
}
```

## Notes
- Ensure the `Authorization` header is included for mutations like `createPackage`, `updatePackage`, and `deletePackage`.
- Only users with the role `admin` can perform write operations (create, update, delete).
