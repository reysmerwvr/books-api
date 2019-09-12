const should = require("should"),
  sinon = require("sinon"),
  bookController = require('../controllers/bookController');

describe("Book Controller Tests", () => {
  describe("Post", () => {
    it("should not allow an empty title on post", () => {
      const Book = book => {
        this.save = () => {};
      };
      const req = {
        body: {
          author: "RV"
        }
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy()
      };
      bookController.storeBook(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
