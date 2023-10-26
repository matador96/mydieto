const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

if (!global.jwt) {
  require("./auth.test.js");
}

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("/GET users", () => {
    it("User list", (done) => {
      chai
        .request(server)
        .get("/api/v1/users")
        .set({ Authorization: `Bearer ${global.jwt}` })
        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });
  });
});
