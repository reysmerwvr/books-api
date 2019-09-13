const express = require("express"),
  Book = require("../models/book"),
  BookController = require("../controllers/bookController");

const routes = () => {
  const bookRouter = express.Router();

  bookRouter
    .route("/")
    .get((req, res) => BookController.getBooks(req, res))
    .post((req, res) => BookController.storeBook(req, res));
  bookRouter.use("/:id", (req, res, next) => {
    Book.findById(req.params.id, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send("No book found");
      }
    });
  });
  bookRouter
    .route("/:id")
    .get((req, res) => {
      const { book, headers: {} } = req;
      const linkedBook = book.toJSON();
      linkedBook.links = {
        filterByAuthor: `http://${req.headers.host}/api/books/?author=${book.author}`.replace(/ /gi, '%20'),
        filterByGenre: `http://${req.headers.host}/api/books/?genre=${book.genre}`.replace(/ /gi, '%20'),
        filterByTitle: `http://${req.headers.host}/api/books/?title=${book.title}`.replace(/ /gi, '%20'),
      };
      res.json(linkedBook);
    })
    .put((req, res) => {
      const { title, author, genre, read } = req.body;
      req.book.title = title;
      req.book.author = author;
      req.book.genre = genre;
      req.book.read = read;
      req.book.save(err => {
        err ? res.status(500).send(err) : res.json(req.book);
      });
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      }
      for (let property in req.body) {
        req.book[property] = req.body[property];
      }
      req.book.save(err => {
        err ? res.status(500).send(err) : res.json(req.book);
      });
    })
    .delete((req, res) => {
      req.book.remove(err => {
        err ? res.status(500).send(err) : res.status(204).send("Removed");
      });
    });

  return bookRouter;
};

module.exports = routes;
