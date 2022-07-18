'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Extratos', {
      cod_operacao: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_cliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'cod_cliente',
        },
      },
      cod_ativo: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ativos',
          key: 'cod_ativo',
        },
      },
      qtde_ativo: {
        allowNull: true,
        type: Sequelize.BIGINT
      },
      operacao:{
        allowNull: false,
        type: Sequelize.STRING(),
      },
      valor:{
        allowNull: false,
        type: Sequelize.DECIMAL(65, 2),
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: 'TIMESTAMP',
        field:'data',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Extratos');
  }
};