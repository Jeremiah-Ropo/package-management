const { buildSchema } = require("graphql");

module.exports = buildSchema(`
 """
  Root Query for retrieving package and user information.
  """
  type Query {
    """
    Retrieve a list of all packages or a specific package by ID.
    """
    packages: [Package]

    """
    Get the currently authenticated user's information.
    """
    user: User

    """
    Retrieve a specific package by its ID.
    """
    package(id: ID!): Package
  }

  """
  Root Mutation for creating, updating, and deleting packages.
  """
  type Mutation {
    """
    Register a new user.
    """
    register(
      """
      Full name of the user.
      """
      name: String!

      """
      Email of the user (must be unique).
      """
      email: String!

      """
      Password for the user account.
      """
      password: String!

      """
      Role of the user (default is 'user', but can either be 'admin' or 'user').
      """
      role: String
    ): AuthData

    """
    Log in with email and password to receive a JWT token.
    """
    login(
      email: String!
      password: String!
    ): AuthData

    """
    Create a new package (Admin only).
    """
    createPackage(
      name: String!
      description: String!
      price: Float!
      expirationDate: String!
    ): Package
  }

  """
  Represents a package with details like name, description, and expiration date.
  """
  type Package {
    id: ID!
    name: String!
    description: String!
    price: Float!
    expirationDate: String!
  }

  """
  Represents a user of the system.
  """
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  """
  Authentication response containing token and user data.
  """
  type AuthData {
    token: String!
    user: User!
  }
`);

// register(name: String!, email: String!, password: String!, role: String): User
// login(email: String!, password: String!): AuthData
// createPackage(name: String!, description: String!, price: Float!, expirationDate: String!): Package
// updatePackage(id: ID!, name: String, description: String, price: Float): Package
// deletePackage(id: ID!): String
