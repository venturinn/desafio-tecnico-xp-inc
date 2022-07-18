const Ativo = (sequelize, DataTypes) => {
  const Ativo = sequelize.define(
    'Ativo',
    {
      cod_ativo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ticker_ativo: DataTypes.STRING,
      qtde_ativo: DataTypes.BIGINT,
      valor: DataTypes.DECIMAL(10, 2),
    },

    { timestamps: false, tableName: 'Ativos', underscored: true },
  );

  return Ativo;
};

module.exports = Ativo;