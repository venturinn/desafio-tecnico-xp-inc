module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      "Carteiras",
      [
        {
          cod_cliente: 11111,
          cod_ativo: 1,
          qtde_ativo: 3000,
        },
        {
          cod_cliente: 11111,
          cod_ativo: 2,
          qtde_ativo: 4000,
        },
        {
          cod_cliente: 11111,
          cod_ativo: 3,
          qtde_ativo: 5000,
        },
        {
          cod_cliente: 22222,
          cod_ativo: 4,
          qtde_ativo: 30000,
        },
        {
          cod_cliente: 33333,
          cod_ativo: 4,
          qtde_ativo: 3000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 2,
          qtde_ativo: 10000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 5,
          qtde_ativo: 1000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 1,
          qtde_ativo: 9000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 7,
          qtde_ativo: 8100,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 9,
          qtde_ativo: 3900,
        },
        {
          cod_cliente: 44444,
          cod_ativo: 10,
          qtde_ativo: 100000,
        },
        {
          cod_cliente: 44444,
          cod_ativo: 16,
          qtde_ativo: 3200,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 12,
          qtde_ativo: 5000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 11,
          qtde_ativo: 3000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 14,
          qtde_ativo: 2000,
        },
        {
          cod_cliente: 66666,
          cod_ativo: 13,
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
