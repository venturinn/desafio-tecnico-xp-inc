'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ativos', {
      cod_ativo: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      qtde_ativo: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ativos');
  }
};