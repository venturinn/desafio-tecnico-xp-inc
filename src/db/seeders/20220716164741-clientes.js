module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Clientes',
      [
        {
          cod_cliente: 11111,
          nome: 'Luiz Barsi Filho',
          email: 'barsi@email.com',
          senha: '123456',
          saldo: 1000,
        },
        {
          cod_cliente: 22222,
          nome: 'Warren Edward Buffett',
          email: 'buffett@email.com',
          senha: '223456',
          saldo: 2000,
        },
        {
          cod_cliente: 33333,
          nome: 'George Soros',
          email: 'soros@email.com',
          senha: '323456',
          saldo: 3000,
        },
        {
          cod_cliente: 44444,
          nome: 'Naji Nahas',
          email: 'nahas@email.com',
          senha: '423456',
          saldo: 4000,
        },
        {
          cod_cliente: 55555,
          nome: 'Tio Ricco',
          email: 'ricco@email.com',
          senha: '523456',
          saldo: 5000,
        },
        {
          cod_cliente: 66666,
          nome: 'Diego Venturin',
          email: 'venturin@email.com',
          senha: '623456',
          saldo: 6000,
        },
        {
          cod_cliente: 77777,
          nome: 'Cliente da XP',
          email: 'cliente@email.com',
          senha: '723456',
          saldo: 6000,
        },
      ],
      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Clientes', null, {});
  },
};
