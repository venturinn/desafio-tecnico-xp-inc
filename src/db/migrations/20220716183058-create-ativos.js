'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ativos', {
      CodAtivo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TickerAtivo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      QtdeAtivo: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      Valor: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ativos');
  }
};