module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Extratos',
      [
        {
          cod_cliente: 11111,
          cod_ativo: 'IRBR3',
          qtde_ativo: 100,
          operacao: 'Venda',
          valor:1280
        },
        {
          cod_cliente: 11111,
          cod_ativo: 'PETR4',
          qtde_ativo: 1000,
          operacao: 'Compra',
          valor:1400
        },
        {
          cod_cliente: 22222,
          valor:10000.88,
          operacao: 'Deposito',
        },
        {
          cod_cliente: 33333,
          valor:1000.99,
          operacao: 'Retirada',
        },
      ],
      { timestamps: true },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Extratos', null, {});
  },
};