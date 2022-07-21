const shell = require("shelljs");

const sinon = require("sinon");
const { expect } = require("chai");

const sequelizeCli = require("../helpers/sequelizeCli");
const investmentsService = require("../../services/investmentsService");
const { Ativo, Cliente, Carteira, Extrato } = require("../../db/models");

describe("Service: ao chamar o service de investments", () => {
  describe("Na compra de uma ativo", () => {
    describe("Quando o id do cliente está INCORRETO", () => {
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
      it("o retorno é um objeto", async () => {
        const response = await investmentsService.buyAsset(17777, "PETR4", 100);
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await investmentsService.buyAsset(17777, "PETR4", 100);
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await investmentsService.buyAsset(17777, "PETR4", 100);
        expect(response.error.code).to.be.equal(404);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await investmentsService.buyAsset(17777, "PETR4", 100);
        expect(response.error.message).to.be.equal("Client does not exist");
      });
    });

    describe("Quando o id do ativo está INCORRETO", () => {
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
      it("o retorno é um objeto", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR13",
          100
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR13",
          100
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR13",
          100
        );
        expect(response.error.code).to.be.equal(404);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR13",
          100
        );
        expect(response.error.message).to.be.equal(
          "Asset PETR13 does not exist"
        );
      });
    });

    describe("Quando a quantidade da ordem de compra excede a liquidez do mercado", () => {
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
      it("o retorno é um objeto", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR4",
          2000000100
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR4",
          2000000100
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR4",
          2000000100
        );
        expect(response.error.code).to.be.equal(400);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR4",
          2000000100
        );
        expect(response.error.message).to.be.equal("Asset illiquid");
      });
    });

    describe("Quando o cliente não possui saldo suficiente para a compra", () => {
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
      it("o retorno é um objeto", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR4",
          2000000000
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR4",
          2000000000
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR4",
          2000000000
        );
        expect(response.error.code).to.be.equal(400);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await investmentsService.buyAsset(
          77777,
          "PETR4",
          2000000000
        );
        expect(response.error.message).to.be.equal("Insufficient funds");
      });
    });

    describe("Quando o id do usuário e do ativo estão corretos e o mercado tem liquidez", () => {
      beforeEach(() => {
        shell.exec(
          [
            sequelizeCli.drop,
            sequelizeCli.create,
            sequelizeCli.migrate,
            sequelizeCli.seed,
          ].join("&&")
        );
      });
      it("o retorno é um objeto", async () => {
        const response = await investmentsService.buyAsset(77777, "PETR4", 100);
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'message' com valor correto", async () => {
        const response = await investmentsService.buyAsset(77777, "PETR4", 100);
        expect(response.message).to.be.equal("Buy transaction done.");
      });

      it("o valor da compra é debitado do saldo da conta do cliente", async () => {
        await investmentsService.buyAsset(77777, "PETR4", 100);
        const accountBalance = await Cliente.findByPk(77777);
        expect(accountBalance.saldo).to.be.equal("3204.00");
      });

      it("a quantidade de ativos da compra é 'debitada' no book da corretora", async () => {
        await investmentsService.buyAsset(77777, "PETR4", 100);
        const asset = await Ativo.findByPk("PETR4");
        expect(asset.qtdeAtivo).to.be.equal(1999999900);
      });

      it("a quantidade de ativos da compra é registrada na carteira do cliente", async () => {
        await investmentsService.buyAsset(77777, "PETR4", 100);
        const portfolio = await Carteira.findOne({
          where: { codCliente: 77777, codAtivo: "PETR4" },
        });
        expect(portfolio.qtdeAtivo).to.be.equal(3100);
      });

      it("a transação é registrada corretamente no extrato do cliente", async () => {
        await investmentsService.buyAsset(77777, "PETR4", 100);
        const statement = await Extrato.findOne({
          order: [["codOperacao", "DESC"]],
        });
        expect(statement.codCliente).to.be.equal(77777);
        expect(statement.codAtivo).to.be.equal("PETR4");
        expect(statement.qtdeAtivo).to.be.equal(100);
        expect(statement.operacao).to.be.equal("Compra");
        expect(statement.valor).to.be.equal("2796.00");
      });
    });
  });

  describe("Na venda de uma ativo", () => {
    describe("Quando o id do cliente está INCORRETO", () => {
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
      it("o retorno é um objeto", async () => {
        const response = await investmentsService.sellAsset(
          17777,
          "PETR4",
          100
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await investmentsService.sellAsset(
          17777,
          "PETR4",
          100
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await investmentsService.sellAsset(
          17777,
          "PETR4",
          100
        );
        expect(response.error.code).to.be.equal(404);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await investmentsService.sellAsset(
          17777,
          "PETR4",
          100
        );
        expect(response.error.message).to.be.equal("Client does not exist");
      });
    });

    describe("Quando o id do ativo está INCORRETO", () => {
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
      it("o retorno é um objeto", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR13",
          100
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR13",
          100
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR13",
          100
        );
        expect(response.error.code).to.be.equal(404);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR13",
          100
        );
        expect(response.error.message).to.be.equal(
          "Asset PETR13 does not exist"
        );
      });
    });

    describe("Quando o cliente não possui o ativo em qtde suficiente na carteira", () => {
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
      it("o retorno é um objeto", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR4",
          20000
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR4",
          20000
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR4",
          20000
        );
        expect(response.error.code).to.be.equal(400);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR4",
          20000
        );
        expect(response.error.message).to.be.equal(
          "Insufficient assets in portfolio"
        );
      });
    });

    describe("Quando o id do usuário e do ativo estão corretos e a qtde está na carteira", () => {
      beforeEach(() => {
        shell.exec(
          [
            sequelizeCli.drop,
            sequelizeCli.create,
            sequelizeCli.migrate,
            sequelizeCli.seed,
          ].join("&&")
        );
      });
      it("o retorno é um objeto", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR4",
          100
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'message' com valor correto", async () => {
        const response = await investmentsService.sellAsset(
          77777,
          "PETR4",
          100
        );
        expect(response.message).to.be.equal("Sell transaction done.");
      });

      it("o valor da compra é debitado do saldo da conta do cliente", async () => {
        await investmentsService.sellAsset(77777, "PETR4", 100);
        const accountBalance = await Cliente.findByPk(77777);
        expect(accountBalance.saldo).to.be.equal("8796.00");
      });

      it("a quantidade de ativos da compra é 'debitada' no book da corretora", async () => {
        await investmentsService.sellAsset(77777, "PETR4", 100);
        const asset = await Ativo.findByPk("PETR4");
        expect(asset.qtdeAtivo).to.be.equal(2000000100);
      });

      it("a quantidade de ativos da compra é registrada na carteira do cliente", async () => {
        await investmentsService.sellAsset(77777, "PETR4", 100);
        const portfolio = await Carteira.findOne({
          where: { codCliente: 77777, codAtivo: "PETR4" },
        });
        expect(portfolio.qtdeAtivo).to.be.equal(2900);
      });

      it("a transação é registrada corretamente no extrato do cliente", async () => {
        await investmentsService.sellAsset(77777, "PETR4", 100);
        const statement = await Extrato.findOne({
          order: [["codOperacao", "DESC"]],
        });
        expect(statement.codCliente).to.be.equal(77777);
        expect(statement.codAtivo).to.be.equal("PETR4");
        expect(statement.qtdeAtivo).to.be.equal(100);
        expect(statement.operacao).to.be.equal("Venda");
        expect(statement.valor).to.be.equal("2796.00");
      });
    });
  });
});
