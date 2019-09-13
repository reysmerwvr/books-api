const Book = require("../models/book");

const getBooks = (req, res) => {
  const searchParams = new URLSearchParams(req.query);
  const query = {};
  for (const [key, value] of searchParams) {
    if (Object.keys(Book.schema.paths).indexOf(key) !== -1) {
      query[key] = value;
    }
  }
  Book.find(query, (err, books) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const mappedBooks = books.map(book => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      res.json(mappedBooks);
    }
  });
};

const storeBook = (req, res) => {
  const book = new Book(req.body);
  if(!req.body.title) {
    res.status(400);
    res.send('Title is required');
  }
  book.save();
  res.status(201);
  res.send(book);
};

module.exports = {
  getBooks,
  storeBook
};
