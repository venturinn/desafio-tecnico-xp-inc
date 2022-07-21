const shell = require("shelljs");

const sinon = require("sinon");
const { expect } = require("chai");

const sequelizeCli = require("../helpers/sequelizeCli");
const assetsService = require("../../services/assetsService");

describe("Service: ao chamar o service de assets", () => {
  describe("Na solicitação de dados do ativo por meio do id", () => {
    before(() => {
      shell.exec(
        [
          sequelizeCli.drop,
          sequelizeCli.create,
          sequelizeCli.migrate,
          sequelizeCli.seed,
        ].join("&&")
      );
    });
    describe("Quando o id informado não existe no banco de dados", () => {
      it("o retorno é um objeto", async () => {
        const response = await assetsService.getAssetById("PETR13");
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await assetsService.getAssetById("PETR13");
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await assetsService.getAssetById("PETR13");
        expect(response.error.code).to.be.equal(404);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await assetsService.getAssetById("PETR13");
        expect(response.error.message).to.be.equal(
          "Asset PETR13 does not exist"
        );
      });
    });

    describe("Quando o id informado existe no banco de dados", () => {
      it("o retorno é um objeto", async () => {
        const response = await assetsService.getAssetById("PETR4");
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui as propriedades 'codAtivo', 'qtdeAtivo' e 'valor'", async () => {
        const response = await assetsService.getAssetById("PETR4");
        expect(response).to.include.all.keys("codAtivo", "qtdeAtivo", "valor");
      });

      it("a propriedade 'codAtivo' possui o valor correto", async () => {
        const response = await assetsService.getAssetById("PETR4");
        expect(response.codAtivo).to.be.equal("PETR4");
      });

      it("a propriedade 'qtdeAtivo' possui o valor correto", async () => {
        const response = await assetsService.getAssetById("PETR4");
        expect(response.qtdeAtivo).to.be.equal(2000000000);
      });

      it("a propriedade 'valor' possui o valor correto", async () => {
        const response = await assetsService.getAssetById("PETR4");
        expect(response.valor).to.be.equal(27.96);
      });
    });
  });
});
