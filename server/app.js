const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const schema = require("./schema/schema");

const app = express();
const port = 4000;

app.use(
  "/graphql",
  createHandler({
    schema,
  })
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
