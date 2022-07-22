module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Ativos',
      [
        {
          cod_ativo: 'IRBR3',
          qtde_ativo: 1000000000,
          valor: 2.11,
        },
        {
          cod_ativo: 'OIBR3',
          qtde_ativo: 5000000000,
          valor: 0.51,
        },
        {
          cod_ativo: 'GOGNA3',
          qtde_ativo: 6000000000,
          valor: 2.42,
        },
        {
          cod_ativo: 'MGLU3',
          qtde_ativo: 2000000000,
          valor: 2.78,
        },
        {
          cod_ativo: 'VIIA3',
          qtde_ativo: 2000000000,
          valor: 2.40,
        },
        {
          cod_ativo: 'PETR4',
          qtde_ativo: 2000000000,
          valor: 27.96,
        },
        {
          cod_ativo: 'VALE3',
          qtde_ativo: 2000000000,
          valor: 68.37,
        },
        {
          cod_ativo: 'BBAS3',
          qtde_ativo: 2000000000,
          valor: 33.28,
        },
        {
          cod_ativo: 'ITUB4',
          qtde_ativo: 2000000000,
          valor: 22.55,
        },
        {
          cod_ativo: 'BRKM5',
          qtde_ativo: 2000000000,
          valor: 34.65,
        },
        {
          cod_ativo: 'BBSE3',
          qtde_ativo: 8000000000,
          valor: 27.48,
        },
        {
          cod_ativo: 'ITSA4',
          qtde_ativo: 2000000000,
          valor: 8.23,
        },
        {
          cod_ativo: 'ELET6',
          qtde_ativo: 2000000000,
          valor: 45.85,
        },
        {
          cod_ativo: 'VIVT3',
          qtde_ativo: 2000000000,
          valor: 46.85,
        },
        {
          cod_ativo: 'TAEE11',
          qtde_ativo: 2000000000,
          valor: 39.59,
        },
        {
          cod_ativo: 'AESB3',
          qtde_ativo: 2000000000,
          valor: 10.44,
        },
        {
          cod_ativo: 'SAPR4',
          qtde_ativo: 2000000000,
          valor: 3.60,
        },
      ],
      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Ativos', null, {});
  },
};
