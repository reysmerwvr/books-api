const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

const db = (process.env.ENV === 'Test') ? 'booksAPI_test' : 'booksAPI';
mongoose.connect(`mongodb://localhost/${db}`, {
  useNewUrlParser: true
});

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')();

app.use("/api/books", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log(`Gulp is Running on Port ${port}`);
});

module.exports = app;
