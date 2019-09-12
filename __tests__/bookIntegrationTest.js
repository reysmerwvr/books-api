const should = require("should"),
  request = require("supertest"),
  app = require("../app"),
  mongoose = require("mongoose"),
  Book = mongoose.model("Book"),
  agent = request.agent(app);

describe("Book Crud Test", () => {
  it("Should allow a book to be posted and return a read and _id", done => {
    const bookPost = { title: "new Book", author: "RV", genre: "Fiction" };
    agent
      .post("api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach(done => {
    Book.remove().exec();
    done();
  });
});
