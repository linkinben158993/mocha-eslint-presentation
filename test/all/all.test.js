const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("POST /users/all", function () {
  let server;

  before(async function () {
    console.log("Initialize server instance...");
    server = require("../../app").server;
    await chai.request.agent(server);
  });

  // Case body should have message
  it("Case body should have message property", function (done) {
    const data = {
      messageee: "Send me all user data!",
    };

    chai
      .request(server)
      .post("/users/all")
      .send(data)
      .then((res) => {
        res.body.should.be.a("object");
        console.log("Pass body type!");

        res.body.should.have.property("message");
        console.log("Pass body properties");

        done();
      })
      .catch(done);
  });

  // Best case
  it("Case body should have message property", function (done) {
    const data = {
      message: "Send me all user data!",
    };

    chai
      .request(server)
      .post("/users/all")
      .send(data)
      .then((res) => {
        res.body.should.be.a("object");
        console.log("Pass body type!");

        res.body.should.have.property("message");
        console.log("Pass body properties");

        done();
      })
      .catch(done);
  });
});
