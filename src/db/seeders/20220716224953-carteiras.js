module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      "Carteiras",
      [
        {
          cod_cliente: 77777,
          cod_ativo: 'PETR4',
          qtde_ativo: 3000,
        },
        {
          cod_cliente: 77777,
          cod_ativo: 'BBAS3',
          qtde_ativo: 6000,
        },
        {
          cod_cliente: 11111,
          cod_ativo: 'OIBR3',
          qtde_ativo: 3000,
        },
        {
          cod_cliente: 11111,
          cod_ativo: 'PETR4',
          qtde_ativo: 4000,
        },
        {
          cod_cliente: 11111,
          cod_ativo: 'ITSA4',
          qtde_ativo: 5000,
        },
        {
          cod_cliente: 22222,
          cod_ativo: 'VIVT3',
          qtde_ativo: 30000,
        },
        {
          cod_cliente: 33333,
          cod_ativo: 'ELET6',
          qtde_ativo: 3000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 'BBSE3',
          qtde_ativo: 10000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 'BBAS3',
          qtde_ativo: 1000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 'BRKM5',
          qtde_ativo: 9000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 'AESB3',
          qtde_ativo: 8000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 'SAPR4',
          qtde_ativo: 3900,
        },
        {
          cod_cliente: 44444,
          cod_ativo: 'IRBR3',
          qtde_ativo: 100000,
        },
        {
          cod_cliente: 44444,
          cod_ativo: 'VIIA3',
          qtde_ativo: 3200,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 'IRBR3',
          qtde_ativo: 5000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 'VIIA3',
          qtde_ativo: 3000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 'MGLU3',
          qtde_ativo: 2000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 'PETR4',
          qtde_ativo: 33000,
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("Carteiras", null, {});
  },
};
