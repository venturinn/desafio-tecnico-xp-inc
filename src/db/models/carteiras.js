const Carteira = (sequelize, DataTypes) => {
  const Carteira = sequelize.define(
    'Carteira',
    {
      qtdeAtivo: DataTypes.BIGINT,
    },

    { timestamps: false, tableName: 'Carteiras', underscored: true },
  );

  Carteira.associate = (models) => {
    models.Ativo.belongsToMany(models.Cliente, {
      as: 'clientes',
      through: Carteira,
      foreignKey: 'codAtivo',
      otherKey: 'codCliente',
    });
    models.Cliente.belongsToMany(models.Ativo, {
      as: 'ativos',
      through: Carteira,
      foreignKey: 'codCliente',
      otherKey: 'codAtivo',
    });
  };

  return Carteira;
};

module.exports = Carteira;