const sinon = require("sinon");
const { expect } = require("chai");

const investmentsController = require("../../controllers/investmentsController");
const investmentsService = require("../../services/investmentsService");

const res = {};
const req = {};

describe("Controller: ao chamar o controller de investments", () => {
  describe("Na solicitação de compra de um ativo", () => {
    describe("Quando a camada de serviço retorna um erro", () => {
      const mockServicesReturn = {
        error: {
          code: 404,
          message: "Asset PETR13 does not exist",
        },
      };

      before(() => {
        req.body = { codCliente: 12345, codAtivo: "PETR13", qtdeAtivo: 1000 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(investmentsService, "buyAsset").resolves(mockServicesReturn);
      });

      after(async () => {
        investmentsService.buyAsset.restore();
      });

      it("o next é chamado com o erro retornado pela camada de serviço", async () => {
        await investmentsController.buyAsset(req, res, next);
        expect(next.calledWith(mockServicesReturn.error)).to.be.equal(true);
      });
    });

    describe("Quando a operação de compra é executada com sucesso", () => {
      const mockServicesReturn = { message: "Buy transaction done." };

      before(() => {
        req.body = { codCliente: 12345, codAtivo: "PETR4", qtdeAtivo: 1000 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(investmentsService, "buyAsset").resolves(mockServicesReturn);
      });

      after(async () => {
        investmentsService.buyAsset.restore();
      });

      it("é chamado o status com o código 200", async () => {
        await investmentsController.buyAsset(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é chamado o json com a mensagem correta", async () => {
        await investmentsController.buyAsset(req, res, next);
        expect(
          res.json.calledWith(mockServicesReturn)
        ).to.be.equal(true);
      });
    });
  });

  describe("Na solicitação de venda de um ativo", () => {
    describe("Quando a camada de serviço retorna um erro", () => {
      const mockServicesReturn = {
        error: {
          code: 404,
          message: "Asset PETR13 does not exist",
        },
      };

      before(() => {
        req.body = { codCliente: 12345, codAtivo: "PETR13", qtdeAtivo: 1000 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon
          .stub(investmentsService, "sellAsset")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        investmentsService.sellAsset.restore();
      });

      it("o next é chamado com o erro retornado pela camada de serviço", async () => {
        await investmentsController.sellAsset(req, res, next);
        expect(next.calledWith(mockServicesReturn.error)).to.be.equal(true);
      });
    });

    describe("Quando a operação de compra é executada com sucesso", () => {
      const mockServicesReturn = { message: "Sell transaction done." };

      before(() => {
        req.body = { codCliente: 12345, codAtivo: "PETR4", qtdeAtivo: 1000 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(investmentsService, "sellAsset")
          .resolves(mockServicesReturn);
      });

      after(async () => {
        investmentsService.sellAsset.restore();
      });

      it("é chamado o status com o código 200", async () => {
        await investmentsController.sellAsset(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é chamado o json com a mensagem correta", async () => {
        await investmentsController.sellAsset(req, res, next);
        expect(
          res.json.calledWith(mockServicesReturn)
        ).to.be.equal(true);
      });
    });
  });
});
