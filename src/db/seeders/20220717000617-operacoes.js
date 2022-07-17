module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Operacoes',
      [
        {
          CodCliente: 98765,
          CodAtivo: 1,
          QtdeAtivo: 100,
          Operacao: 'V',
        },
        {
          CodCliente: 58765,
          CodAtivo: 2,
          QtdeAtivo: 1000,
          Operacao: 'C',
        },
      ],
      { timestamps: true },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Operacoes', null, {});
  },
};
