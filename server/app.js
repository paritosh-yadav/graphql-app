const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();
const port = 4000;

mongoose.connect(
  "mongodb+srv://username:password@cluster/booklibrary?retryWrites=true&w=majority&appName=Cluster0"
);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});
app.use(
  "/graphql",
  createHandler({
    schema,
  })
);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
