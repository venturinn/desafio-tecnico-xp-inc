const sinon = require("sinon");
const { expect } = require("chai");

const assetsController = require("../../controllers/assetsController");
const assetsService = require("../../services/assetsService");

const res = {};
const req = {};

describe("Controller: ao chamar o controller de assets", () => {
  describe("Na solicitação de dados do ativo por meio do id", () => {
    describe("Quando o id informado não existe no banco de dados", () => {
      const mockServicesReturn = {
        error: {
          code: 404,
          message: "Asset PETR13 does not exist",
        },
      };

      before(() => {
        req.params = { id: "PETR13" };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(assetsService, "getAssetById").resolves(mockServicesReturn);
      });

      after(async () => {
        assetsService.getAssetById.restore();
      });

      it("o next é chamado com o argumento correto", async () => {
        await assetsController.getAssetById(req, res, next);
        expect(next.calledWith(mockServicesReturn.error)).to.be.equal(true);
      });
    });

    describe("Quando o id informado existe no banco de dados", () => {
      const mockServicesReturn = {
        codAtivo: "PETR4",
        qtdeAtivo: 1000,
        valor: 27.96,
      };

      before(() => {
        req.params = { id: "PETR4" };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(assetsService, "getAssetById").resolves(mockServicesReturn);
      });

      after(async () => {
        assetsService.getAssetById.restore();
      });

      it("é chamado o status com o código 200", async () => {
        await assetsController.getAssetById(req, res, next);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it("é chamado o json com a mensagem correta", async () => {
        await assetsController.getAssetById(req, res, next);
        expect(res.json.calledWith(mockServicesReturn)).to.be.equal(true);
      });
    });
  });
});
