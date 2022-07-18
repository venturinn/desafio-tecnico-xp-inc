const Carteira = (sequelize, DataTypes) => {
  const Carteira = sequelize.define(
    'Carteira',
    {
      qtde_ativo: DataTypes.BIGINT,
    },

    { timestamps: false, tableName: 'Carteiras', underscored: true },
  );

  Carteira.associate = (models) => {
    models.Ativo.belongsToMany(models.Cliente, {
      as: 'clientes',
      through: Carteira,
      foreignKey: 'cod_ativo',
      otherKey: 'cod_cliente',
    });
    models.Cliente.belongsToMany(models.Ativo, {
      as: 'ativos',
      through: Carteira,
      foreignKey: 'cod_cliente',
      otherKey: 'cod_ativo',
    });
  };

  return Carteira;
};

module.exports = Carteira;