module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Extratos',
      [
        {
          CodCliente: 98765,
          CodAtivo: 1,
          QtdeAtivo: 100,
          Operacao: 'Venda',
          Valor:1280
        },
        {
          CodCliente: 58765,
          CodAtivo: 2,
          QtdeAtivo: 1000,
          Operacao: 'Compra',
          Valor:1400
        },
        {
          CodCliente: 58765,
          Valor:10000.88,
          Operacao: 'Deposito',
        },
        {
          CodCliente: 98765,
          Valor:1000.99,
          Operacao: 'Retirada',
        },
      ],
      { timestamps: true },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Extratos', null, {});
  },
};