const Ativo = (sequelize, DataTypes) => {
  const Ativo = sequelize.define(
    'Ativo',
    {
      CodAtivo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TickerAtivo: DataTypes.STRING,
      QtdeAtivo: DataTypes.BIGINT,
      Valor: DataTypes.DECIMAL(10, 2),
    },

    { timestamps: false, tableName: 'Ativos', underscored: false },
  );

  return Ativo;
};

module.exports = Ativo;