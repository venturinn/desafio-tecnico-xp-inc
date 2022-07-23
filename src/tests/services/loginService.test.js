const shell = require("shelljs");

const sinon = require("sinon");
const { expect } = require("chai");

const sequelizeCli = require("../helpers/sequelizeCli");
const loginService = require("../../services/loginService");

describe("Service: ao chamar o service de login", () => {
  describe("Na solicitação de um token", () => {
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
    describe("Quando o email informado está incorreto", () => {
      it("o retorno é um objeto", async () => {
        const response = await loginService.login(
          "fakeuser@email.com",
          "623456"
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await loginService.login(
          "fakeuser@email.com",
          "623456"
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await loginService.login(
          "fakeuser@email.com",
          "623456"
        );
        expect(response.error.code).to.be.equal(401);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await loginService.login(
          "fakeuser@email.com",
          "623456"
        );
        expect(response.error.message).to.be.equal(
          "Incorrect username or password"
        );
      });
    });

    describe("Quando a senha informada está incorreta", () => {
      it("o retorno é um objeto", async () => {
        const response = await loginService.login(
          "cliente@email.com",
          "123456"
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'error'", async () => {
        const response = await loginService.login(
          "cliente@email.com",
          "123456"
        );
        expect(response).to.include.all.keys("error");
      });

      it("o objeto de erro possui a propriedade 'code' com o valor correto", async () => {
        const response = await loginService.login(
          "cliente@email.com",
          "123456"
        );
        expect(response.error.code).to.be.equal(401);
      });

      it("o objeto de erro possui a propriedade 'message' com o valor correto", async () => {
        const response = await loginService.login(
          "cliente@email.com",
          "123456"
        );
        expect(response.error.message).to.be.equal(
          "Incorrect username or password"
        );
      });
    });

    describe("Quando o email e senha informados estão corretos", () => {
      it("o retorno é um objeto", async () => {
        const response = await loginService.login(
          "cliente@email.com",
          "723456"
        );
        expect(response).to.be.an("object");
      });

      it("o objeto retornado possui a propriedade 'token'", async () => {
        const response = await loginService.login(
          "cliente@email.com",
          "723456"
        );
        expect(response).to.include.all.keys("token");
      });

      it("a propriedade 'token' possui o valor do tipo string", async () => {
        const response = await loginService.login(
          "cliente@email.com",
          "723456"
        );
        expect(response.token).to.be.an("string");
      });

      it("o token possui um tamanho de 185 caracteres", async () => {
        const response = await loginService.login(
          "cliente@email.com",
          "723456"
        );
        expect(response.token.length).to.be.equal(153);
      });
    });
  });
});
