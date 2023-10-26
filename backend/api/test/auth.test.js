process.env.TEST = "true";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);
chai.should();

const userFields = ["id", "login"];

describe("Auth", () => {
  describe("/GET Auth", () => {
    it("Auth", (done) => {
      let user = {
        login: "test",
        password: "test",
      };

      chai
        .request(server)
        .post("/api/v1/user/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("jwt");

          userFields.map((e) => res.body.data.should.have.property(e));

          global.jwt = res.body.jwt; // save for next responses

          done();
        });
    });
  });
});
