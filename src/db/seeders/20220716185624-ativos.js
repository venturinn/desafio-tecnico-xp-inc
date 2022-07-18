module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Ativos',
      [
        {
          ticker_ativo: 'IRBR3',
          qtde_ativo: 1000000000,
          valor: 2.11,
        },
        {
          ticker_ativo: 'OIBR3',
          qtde_ativo: 5000000000,
          valor: 0.51,
        },
        {
          ticker_ativo: 'GOGNA3',
          qtde_ativo: 6000000000,
          valor: 2.42,
        },
        {
          ticker_ativo: 'MGLU3',
          qtde_ativo: 2000000000,
          valor: 2.78,
        },
        {
          ticker_ativo: 'VIIA3',
          qtde_ativo: 2000000000,
          valor: 2.40,
        },
        {
          ticker_ativo: 'PETR4',
          qtde_ativo: 2000000000,
          valor: 27.96,
        },
        {
          ticker_ativo: 'VALE3',
          qtde_ativo: 2000000000,
          valor: 68.37,
        },
        {
          ticker_ativo: 'BBAS3',
          qtde_ativo: 2000000000,
          valor: 33.28,
        },
        {
          ticker_ativo: 'ITUB4',
          qtde_ativo: 2000000000,
          valor: 22.55,
        },
        {
          ticker_ativo: 'BRKM5',
          qtde_ativo: 2000000000,
          valor: 34.65,
        },
        {
          ticker_ativo: 'BBSE3',
          qtde_ativo: 8000000000,
          valor: 27.48,
        },
        {
          ticker_ativo: 'ITSA4',
          qtde_ativo: 2000000000,
          valor: 8.23,
        },
        {
          ticker_ativo: 'ELET6',
          qtde_ativo: 2000000000,
          valor: 45.85,
        },
        {
          ticker_ativo: 'VIVT3',
          qtde_ativo: 2000000000,
          valor: 46.85,
        },
        {
          ticker_ativo: 'TAEE11',
          qtde_ativo: 2000000000,
          valor: 39.59,
        },
        {
          ticker_ativo: 'AESB3',
          qtde_ativo: 2000000000,
          valor: 10.44,
        },
        {
          ticker_ativo: 'SAPR4',
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
