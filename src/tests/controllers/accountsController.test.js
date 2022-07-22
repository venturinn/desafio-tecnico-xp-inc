const sinon = require("sinon");
const { expect } = require("chai");

const accountsController = require("../../controllers/accountsController");
const accountsService = require("../../services/accountsService");

const res = {};
const req = {};

describe("Controller: ao chamar o controller de accounts", () => {
  describe("Na solicitação do extrato por código do cliente", () => {
    describe("Quando o id enviado via url é diferente do id do usuário logado", () => {
      const authorizationError = {
        code: 401,
        message: "Service requested is not permitted to the user",
      };

      before(() => {
        req.params = { id: "12345" };
        req.user = 78912;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
      });

      it("o next é chamado com o argumento correto", async () => {
        await accountsController.getAccountBalanceByClientId(req, res, next);
        expect(next.calledWith(authorizationError)).to.be.equal(true);
      });
    });

    describe("Quando a camada de serviço retorna um erro", () => {
      const mockServicesReturn = {
        error: {
          code: 404,
          message: "Client does not exist",
        },
      };

      before(() => {
        req.params = { id: "123456" };
        req.user = 123456;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon
          .stub(accountsService, "getAccountBalanceByClientId")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        accountsService.getAccountBalanceByClientId.restore();
      });

      it("o next é chamado com o argumento correto", async () => {
        await accountsController.getAccountBalanceByClientId(req, res, next);
        expect(next.calledWith(mockServicesReturn.error)).to.be.equal(true);
      });
    });

    describe("Quando o id enviado via url corresponde com o usuário logado", () => {
      const mockServicesReturn = {
        codCliente: 12345,
        saldo: 1000.13,
      };

      before(() => {
        req.params = { id: "12345" };
        req.user = 12345;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(accountsService, "getAccountBalanceByClientId")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        accountsService.getAccountBalanceByClientId.restore();
      });

      it("é chamado o status com o código 200", async () => {
        await accountsController.getAccountBalanceByClientId(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é chamado o json com a mensagem correta", async () => {
        await accountsController.getAccountBalanceByClientId(req, res, next);
        expect(res.json.calledWith(mockServicesReturn)).to.be.equal(true);
      });
    });
  });

  describe("Na solicitação de depósito na conta", () => {
    describe("Quando a camada de serviço retorna um erro", () => {
      const mockServicesReturn = {
        error: {
          code: 404,
          message: "Client does not exist",
        },
      };

      before(() => {
        req.body = { codCliente: 12345, valor: 1000.13 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon
          .stub(accountsService, "makeAccountDeposit")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        accountsService.makeAccountDeposit.restore();
      });

      it("o next é chamado com o erro retornado pela camada de serviço", async () => {
        await accountsController.makeAccountDeposit(req, res, next);
        expect(next.calledWith(mockServicesReturn.error)).to.be.equal(true);
      });
    });

    describe("Quando o depósito é executado corretamente", () => {
      const mockServicesReturn = {
        codCliente: 12345,
        saldo: 2000.13,
      };

      before(() => {
        req.body = { codCliente: 12345, valor: 1000.13 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(accountsService, "makeAccountDeposit")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        accountsService.makeAccountDeposit.restore();
      });

      it("é chamado o status com o código 200", async () => {
        await accountsController.makeAccountDeposit(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é chamado o json com a mensagem correta", async () => {
        await accountsController.makeAccountDeposit(req, res, next);
        expect(res.json.calledWith(mockServicesReturn)).to.be.equal(true);
      });
    });
  });

  describe("Na solicitação de retirada na conta", () => {
    describe("Quando a camada de serviço retorna um erro", () => {
      const mockServicesReturn = {
        error: {
          code: 400,
          message: "Insufficient funds",
        },
      };

      before(() => {
        req.body = { codCliente: 12345, valor: 1000.13 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon
          .stub(accountsService, "makeAccountWithdrawal")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        accountsService.makeAccountWithdrawal.restore();
      });

      it("o next é chamado com o erro retornado pela camada de serviço", async () => {
        await accountsController.makeAccountWithdrawal(req, res, next);
        expect(next.calledWith(mockServicesReturn.error)).to.be.equal(true);
      });
    });

    describe("Quando o retirada é executada corretamente", () => {
      const mockServicesReturn = {
        codCliente: 12345,
        saldo: 1000.13,
      };

      before(() => {
        req.body = { codCliente: 12345, valor: 1000.13 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(accountsService, "makeAccountWithdrawal")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        accountsService.makeAccountWithdrawal.restore();
      });

      it("é chamado o status com o código 200", async () => {
        await accountsController.makeAccountWithdrawal(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é chamado o json com a mensagem correta", async () => {
        await accountsController.makeAccountWithdrawal(req, res, next);
        expect(res.json.calledWith(mockServicesReturn)).to.be.equal(true);
      });
    });
  });

  describe("Na solicitação da carteira de investimentos por código do cliente", () => {
    describe("Quando o id enviado via url é diferente do id do usuário logado", () => {
      const authorizationError = {
        code: 401,
        message: "Service requested is not permitted to the user",
      };

      before(() => {
        req.params = { id: "12345" };
        req.user = 78912;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
      });

      it("o next é chamado com o argumento correto", async () => {
        await accountsController.getPortfolioByClientId(req, res, next);
        expect(next.calledWith(authorizationError)).to.be.equal(true);
      });
    });

    describe("Quando a camada de serviço retorna um erro", () => {
      const mockServicesReturn = {
        error: {
          code: 404,
          message: "Client does not exist",
        },
      };

      before(() => {
        req.params = { id: "123456" };
        req.user = 123456;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon
          .stub(accountsService, "getPortfolioByClientId")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        accountsService.getPortfolioByClientId.restore();
      });

      it("o next é chamado com o argumento correto", async () => {
        await accountsController.getPortfolioByClientId(req, res, next);
        expect(next.calledWith(mockServicesReturn.error)).to.be.equal(true);
      });
    });

    describe("Quando o id enviado via url corresponde com o usuário logado", () => {
      const mockServicesReturn = [
        {
          codCliente: 12345,
          codAtivo: "BBAS3",
          qtdeAtivo: 1000,
          valor: 33280,
        },
        {
          codCliente: 12345,
          codAtivo: "BRKM5",
          qtdeAtivo: 9000,
          valor: 311850,
        },
      ];

      before(() => {
        req.params = { id: "12345" };
        req.user = 12345;
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(accountsService, "getPortfolioByClientId")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        accountsService.getPortfolioByClientId.restore();
      });

      it("é chamado o status com o código 200", async () => {
        await accountsController.getPortfolioByClientId(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é chamado o json com a mensagem correta", async () => {
        await accountsController.getPortfolioByClientId(req, res, next);
        expect(res.json.calledWith(mockServicesReturn)).to.be.equal(true);
      });
    });
  });
});
