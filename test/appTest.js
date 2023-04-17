var request = require("supertest");
var app = require("../app");

describe("Our server", function () {
  // Called once before any of the tests in this block begin.
  before(function (done) {
    app.listen(function (err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it("should send back something", function () {
    request(app)
      .get("/")
      .expect(200, function (err, res) {
        if (err) {
          return done(err);
        }
        console.log(res);
        // callStatus = res.body.goodCall;
        // expect(callStatus).to.equal(true);
        // Done
        done();
      });
  });
});
