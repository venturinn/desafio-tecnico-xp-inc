module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      "Carteiras",
      [
        {
          CodCliente: 18765,
          CodAtivo: 1,
          QtdeAtivo: 3000,
        },
        {
          CodCliente: 18765,
          CodAtivo: 2,
          QtdeAtivo: 4000,
        },
        {
          CodCliente: 18765,
          CodAtivo: 3,
          QtdeAtivo: 5000,
        },
        {
          CodCliente: 28765,
          CodAtivo: 4,
          QtdeAtivo: 30000,
        },
        {
          CodCliente: 38765,
          CodAtivo: 4,
          QtdeAtivo: 3000,
        },
        {
          CodCliente: 48765,
          CodAtivo: 2,
          QtdeAtivo: 10000,
        },
        {
          CodCliente: 48765,
          CodAtivo: 5,
          QtdeAtivo: 1000,
        },
        {
          CodCliente: 48765,
          CodAtivo: 1,
          QtdeAtivo: 9000,
        },
        {
          CodCliente: 58765,
          CodAtivo: 7,
          QtdeAtivo: 8100,
        },
        {
          CodCliente: 58765,
          CodAtivo: 9,
          QtdeAtivo: 3900,
        },
        {
          CodCliente: 58765,
          CodAtivo: 10,
          QtdeAtivo: 100000,
        },
        {
          CodCliente: 58765,
          CodAtivo: 16,
          QtdeAtivo: 3200,
        },
        {
          CodCliente: 58765,
          CodAtivo: 12,
          QtdeAtivo: 5000,
        },
        {
          CodCliente: 58765,
          CodAtivo: 11,
          QtdeAtivo: 3000,
        },
        {
          CodCliente: 58765,
          CodAtivo: 14,
          QtdeAtivo: 2000,
        },
        {
          CodCliente: 58765,
          CodAtivo: 13,
          QtdeAtivo: 33000,
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("Carteiras", null, {});
  },
};
