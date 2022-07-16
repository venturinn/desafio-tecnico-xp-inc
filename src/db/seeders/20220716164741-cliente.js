module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Clientes',
      [
        {
          CodCliente: 98765,
          Nome: 'Luiz Barsi Filho',
          Email: 'barsi@email.com',
          Senha: '123456',
          Saldo: 1000000.5,
        },
        {
          CodCliente: 18765,
          Nome: 'Warren Edward Buffett',
          Email: 'buffett@email.com',
          Senha: '223456',
          Saldo: 3000000.5,
        },
        {
          CodCliente: 28765,
          Nome: 'George Soros',
          Email: 'soros@email.com',
          Senha: '323456',
          Saldo: 2000000.5,
        },
        {
          CodCliente: 38765,
          Nome: 'Naji Nahas',
          Email: 'nahas@email.com',
          Senha: '423456',
          Saldo: 9000000.5,
        },
        {
          CodCliente: 48765,
          Nome: 'Tio Ricco',
          Email: 'ricco@email.com',
          Senha: '523456',
          Saldo: 7000000.5,
        },
        {
          CodCliente: 58765,
          Nome: 'Diego Venturin',
          Email: 'venturin@email.com',
          Senha: '523456',
          Saldo: 1000000000.88,
        },
      ],
      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Clientes', null, {});
  },
};
