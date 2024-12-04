const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");
const connectDB = require("./config/database");
const authMiddleware = require("./middlewares/auth");


connectDB();
const app = express();

app.use(express.json());
app.use(authMiddleware);


app.use(
  "/graphql",
  graphqlHTTP((req, res) => {
    return {
      schema,
      rootValue: resolver,
      req,
      res,
      graphiql: { headerEditorEnabled: true },
      customFormatErrorFn: (error) => ({
        message: error.message || "An error occurred",
        statusCode: error.originalError?.status || 500,
        path: error.path,
      }),
    };
  })
);


module.exports = app;