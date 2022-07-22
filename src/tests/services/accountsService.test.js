const shell = require("shelljs");

const sinon = require("sinon");
const { expect } = require("chai");

const sequelizeCli = require("../helpers/sequelizeCli");
const accountsService = require("../../services/accountsService");
const { Extrato } = require("../../db/models");

describe("Service: ao chamar o service de accounts", () => {
  describe("Na solicitação de saldo da conta do cliente por meio do id", () => {
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
    describe("Quando o id do cliente está INCORRETO", () => {
      it("o retorno é um objeto", async () => {
        const response = await accountsService.getAccountBalanceByClientId(
          17777
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await accountsService.getAccountBalanceByClientId(
          17777
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await accountsService.getAccountBalanceByClientId(
          17777
        );
        expect(response.error.code).to.be.equal(404);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await accountsService.getAccountBalanceByClientId(
          17777
        );
        expect(response.error.message).to.be.equal("Client does not exist");
      });
    });

    describe("Quando o id do cliente está CORRETO", () => {
      it("o retorno é um objeto", async () => {
        const response = await accountsService.getAccountBalanceByClientId(
          77777
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui as propriedades 'codCliente', 'saldo'", async () => {
        const response = await accountsService.getAccountBalanceByClientId(
          77777
        );
        expect(response).to.include.all.keys("codCliente", "saldo");
      });

      it("a propriedade 'codCliente' possui o valor correto", async () => {
        const response = await accountsService.getAccountBalanceByClientId(
          77777
        );
        expect(response.codCliente).to.be.equal(77777);
      });

      it("a propriedade 'saldo' possui o valor correto", async () => {
        const response = await accountsService.getAccountBalanceByClientId(
          77777
        );
        expect(response.saldo).to.be.equal(6000);
      });
    });
  });

  describe("Na realização de um depósito na conta do cliente", () => {
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
        const response = await accountsService.makeAccountDeposit(17777, 1000);
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await accountsService.makeAccountDeposit(17777, 1000);
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await accountsService.makeAccountDeposit(17777, 1000);
        expect(response.error.code).to.be.equal(404);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await accountsService.makeAccountDeposit(17777, 1000);
        expect(response.error.message).to.be.equal("Client does not exist");
      });
    });

    describe("Quando o id do cliente está CORRETO", () => {
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
        const response = await accountsService.makeAccountDeposit(77777, 1000);
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui as propriedades 'codCliente', 'saldo'", async () => {
        const response = await accountsService.makeAccountDeposit(77777, 1000);
        expect(response).to.include.all.keys("codCliente", "saldo");
      });

      it("a propriedade 'codCliente' possui o valor correto", async () => {
        const response = await accountsService.makeAccountDeposit(77777, 1000);
        expect(response.codCliente).to.be.equal(77777);
      });

      it("a propriedade 'saldo' possui o saldo atualizado com o depósito realizado", async () => {
        const response = await accountsService.makeAccountDeposit(77777, 1000);
        expect(response.saldo).to.be.equal(7000);
      });

      it("a transação é registrada corretamente no extrato do cliente", async () => {
        await accountsService.makeAccountDeposit(77777, 1000);
        const statement = await Extrato.findOne({
          order: [["codOperacao", "DESC"]],
        });
        expect(statement.codCliente).to.be.equal(77777);
        expect(statement.operacao).to.be.equal("Deposito");
        expect(statement.valor).to.be.equal("1000.00");
      });
    });
  });

  describe("Na realização de uma retirada na conta do cliente", () => {
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
        const response = await accountsService.makeAccountWithdrawal(
          17777,
          1000
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await accountsService.makeAccountWithdrawal(
          17777,
          1000
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await accountsService.makeAccountWithdrawal(
          17777,
          1000
        );
        expect(response.error.code).to.be.equal(404);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await accountsService.makeAccountWithdrawal(
          17777,
          1000
        );
        expect(response.error.message).to.be.equal("Client does not exist");
      });
    });

    describe("Quando o id do cliente está CORRETO e a retirada excede o saldo", () => {
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
        const response = await accountsService.makeAccountWithdrawal(
          77777,
          6001
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await accountsService.makeAccountWithdrawal(
          77777,
          6001
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await accountsService.makeAccountWithdrawal(
          77777,
          6001
        );
        expect(response.error.code).to.be.equal(400);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await accountsService.makeAccountWithdrawal(
          77777,
          6001
        );
        expect(response.error.message).to.be.equal("Insufficient funds");
      });
    });

    describe("Quando o id do cliente está CORRETO e a retirada NÃO excede o saldo", () => {
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
        const response = await accountsService.makeAccountWithdrawal(
          77777,
          1000
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui as propriedades 'codCliente', 'saldo'", async () => {
        const response = await accountsService.makeAccountWithdrawal(
          77777,
          1000
        );
        expect(response).to.include.all.keys("codCliente", "saldo");
      });

      it("a propriedade 'codCliente' possui o valor correto", async () => {
        const response = await accountsService.makeAccountWithdrawal(
          77777,
          1000
        );
        expect(response.codCliente).to.be.equal(77777);
      });

      it("a propriedade 'saldo' possui o saldo atualizado com a retirada realizado", async () => {
        const response = await accountsService.makeAccountWithdrawal(
          77777,
          1000
        );
        expect(response.saldo).to.be.equal(5000);
      });

      it("a transação é registrada corretamente no extrato do cliente", async () => {
        await accountsService.makeAccountWithdrawal(77777, 1000);
        const statement = await Extrato.findOne({
          order: [["codOperacao", "DESC"]],
        });
        expect(statement.codCliente).to.be.equal(77777);
        expect(statement.operacao).to.be.equal("Retirada");
        expect(statement.valor).to.be.equal("1000.00");
      });
    });
  });

  describe("Na solicitação da carteira do cliente por meio do id", () => {
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
    describe("Quando o id do cliente está INCORRETO", () => {
      it("o retorno é um objeto", async () => {
        const response = await accountsService.getPortfolioByClientId(17777);
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await accountsService.getPortfolioByClientId(17777);
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await accountsService.getPortfolioByClientId(17777);
        expect(response.error.code).to.be.equal(404);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await accountsService.getPortfolioByClientId(17777);
        expect(response.error.message).to.be.equal("Client does not exist");
      });
    });

    describe("Quando o id do cliente está CORRETO", () => {
      const portfolioTest = [
        {
          codCliente: 77777,
          codAtivo: "BBAS3",
          qtdeAtivo: 6000,
          valor: 199680,
        },
        {
          codCliente: 77777,
          codAtivo: "PETR4",
          qtdeAtivo: 3000,
          valor: 83880,
        },
      ];

      it("o retorno é um array", async () => {
        const response = await accountsService.getPortfolioByClientId(77777);
        expect(response).to.be.an("array");
      });

      it("o retorno é um array de objetos no padrão do contrato da API", async () => {
        const response = await accountsService.getPortfolioByClientId(77777);
        expect(response).to.deep.equal(portfolioTest);
      });
    });
  });
});
