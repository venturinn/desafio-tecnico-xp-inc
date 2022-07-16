const Carteira = (sequelize, DataTypes) => {
  const Carteira = sequelize.define(
    'Carteira',
    {
      QtdeAtivo: DataTypes.BIGINT,
    },

    { timestamps: false, tableName: 'Carteiras', underscored: true },
  );

  Carteira.associate = (models) => {
    models.Ativo.belongsToMany(models.Cliente, {
      as: 'clientes',
      through: Carteira,
      foreignKey: 'CodAtivo',
      otherKey: 'CodCliente',
    });
    models.Cliente.belongsToMany(models.Ativo, {
      as: 'ativos',
      through: Carteira,
      foreignKey: 'CodCliente',
      otherKey: 'CodAtivo',
    });
  };

  return Carteira;
};

module.exports = Carteira;