module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Ativos',
      [
        {
          TickerAtivo: 'IRBR3',
          QtdeAtivo: 1000000000,
          Valor: 2.11,
        },
        {
          TickerAtivo: 'OIBR3',
          QtdeAtivo: 5000000000,
          Valor: 0.51,
        },
        {
          TickerAtivo: 'GOGNA3',
          QtdeAtivo: 6000000000,
          Valor: 2.42,
        },
        {
          TickerAtivo: 'MGLU3',
          QtdeAtivo: 2000000000,
          Valor: 2.78,
        },
        {
          TickerAtivo: 'VIIA3',
          QtdeAtivo: 2000000000,
          Valor: 2.40,
        },
        {
          TickerAtivo: 'PETR4',
          QtdeAtivo: 2000000000,
          Valor: 27.96,
        },
        {
          TickerAtivo: 'VALE3',
          QtdeAtivo: 2000000000,
          Valor: 68.37,
        },
        {
          TickerAtivo: 'BBAS3',
          QtdeAtivo: 2000000000,
          Valor: 33.28,
        },
        {
          TickerAtivo: 'ITUB4',
          QtdeAtivo: 2000000000,
          Valor: 22.55,
        },
        {
          TickerAtivo: 'BRKM5',
          QtdeAtivo: 2000000000,
          Valor: 34.65,
        },
        {
          TickerAtivo: 'BBSE3',
          QtdeAtivo: 8000000000,
          Valor: 27.48,
        },
        {
          TickerAtivo: 'ITSA4',
          QtdeAtivo: 2000000000,
          Valor: 8.23,
        },
        {
          TickerAtivo: 'ELET6',
          QtdeAtivo: 2000000000,
          Valor: 45.85,
        },
        {
          TickerAtivo: 'VIVT3',
          QtdeAtivo: 2000000000,
          Valor: 46.85,
        },
        {
          TickerAtivo: 'TAEE11',
          QtdeAtivo: 2000000000,
          Valor: 39.59,
        },
        {
          TickerAtivo: 'AESB3',
          QtdeAtivo: 2000000000,
          Valor: 10.44,
        },
        {
          TickerAtivo: 'SAPR4',
          QtdeAtivo: 2000000000,
          Valor: 3.60,
        },
      ],
      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Ativos', null, {});
  },
};
