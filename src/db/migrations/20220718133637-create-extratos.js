'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Extratos', {
      CodOperacao: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CodCliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'CodCliente',
        },
      },
      CodAtivo: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'CodAtivo',
        },
      },
      QtdeAtivo: {
        allowNull: true,
        type: Sequelize.BIGINT
      },
      Operacao:{
        allowNull: false,
        type: Sequelize.STRING(),
      },
      Valor:{
        allowNull: false,
        type: Sequelize.DECIMAL(65, 2),
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: 'TIMESTAMP',
        field:'Data',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Extratos');
  }
};