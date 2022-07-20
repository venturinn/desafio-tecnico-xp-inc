const sinon = require("sinon");
const { expect } = require("chai");

const loginController = require("../../controllers/loginController");
const loginService = require("../../services/loginService");

const res = {};
const req = {};

describe("Controller: ao chamar o controller de login", () => {
  describe("Na solicitação de token", () => {
    describe("Quando o email OU senha informados NÃO correspondem ao cadastro no banco", () => {
      const mockServicesReturn = {
        error: {
          code: 404,
          message: "Client does not exist",
        },
      };

      before(() => {
        req.body = { email: "fakeuser@emil.com", senha: "wrongpassword" };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(loginService, "login").resolves(mockServicesReturn);
      });

      after(async () => {
        loginService.login.restore();
      });

      it("o next é chamado com o argumento correto", async () => {
        await loginController.login(req, res, next);
        expect(next.calledWith(mockServicesReturn.error)).to.be.equal(true);
      });
    });

    describe("Quando o email e senha informados correspondem ao cadastro no banco", () => {
      const mockServicesReturn = "ThisIsAtoken";

      before(() => {
        req.body = { email: "realuser@emil.com", senha: "rightpassword" };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(loginService, "login").resolves(mockServicesReturn);
      });

      after(async () => {
        loginService.login.restore();
      });

      it("é chamado o status com o código 200", async () => {
        await loginController.login(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é chamado o json com a mensagem correta", async () => {
        await loginController.login(req, res, next);
        expect(res.json.calledWith({ token: mockServicesReturn })).to.be.equal(
          true
        );
      });
    });
  });
});
