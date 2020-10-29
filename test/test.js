/* Essentials */
process.env.NODE_ENV = "test"; // Sets env variable
const chai = require("chai"); // Imports chai module
const chaiHttp = require("chai-http"); // Imports chai-http module
const app = require("../app"); // Imports express server module from app.js
let token = ""; // Variable to store token
let id = ""; // Variable to store id

chai.should();
chai.use(chaiHttp);

describe("API", () => {
  describe("Create user account with valid email address", () => {
    describe("Route: POST /signup", () => {
      it("201 HAPPY PATH", (done) => {
        chai
          .request(app)
          .post("/signup")
          .send({
            email: "test@test.test",
            password: "12345678",
            firstname: "testtest",
            lastname: "testtest",
          })
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
    });
  });

  describe("Create user account with invalid email address", () => {
    describe("Route: POST /register", () => {
      it("400 HAPPY PATH", (done) => {
        chai
          .request(app)
          .post("/signup")
          .send({
            email: "test.test",
            password: "12345",
          })
          .end((err, res) => {
            res.should.have.status(400);

            done();
          });
      });
    });
  });

  describe("Attempt login with valid email address", () => {
    describe("Route: POST /login", () => {
      it("201 HAPPY PATH", (done) => {
        chai
          .request(app)
          .post("/login")
          .send({
            email: "test@test.test",
            password: "12345678",
          })
          .end((err, res) => {
            res.should.have.status(200);
            token = res.body.token;
            id = res.body.id;
            done();
          });
      });
    });
  });

  describe("Attempt login with invalid email address", () => {
    describe("Route: POST /login", () => {
      it("400 HAPPY PATH", (done) => {
        chai
          .request(app)
          .post("/login")
          .send({
            email: "test.test",
            password: "12345",
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe("Attempt login with invalid password", () => {
    describe("Route: POST /login", () => {
      it("400 HAPPY PATH", (done) => {
        chai
          .request(app)
          .post("/login")
          .send({
            email: "test@test.test",
            password: "invalidpassword",
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe("Attempt deposit with valid id", () => {
    describe("Route: PUT /deposit", () => {
      it("200 HAPPY PATH", (done) => {
        chai
          .request(app)
          .put("/deposit")
          .send({
            id: id,
            amount: 1000,
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe("Attempt to find a user by id", () => {
    describe("Route: PUT /findone", () => {
      it("200 HAPPY PATH", (done) => {
        chai
          .request(app)
          .post("/findone")
          .send({
            id: id,
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

  describe("Attempt to find all users", () => {
    describe("Route: GET /findall", () => {
      it("200 HAPPY PATH", (done) => {
        chai
          .request(app)
          .get("/findall")
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});
