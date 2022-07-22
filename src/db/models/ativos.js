const Ativo = (sequelize, DataTypes) => {
  const Ativo = sequelize.define(
    'Ativo',
    {
      codAtivo: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      qtdeAtivo: DataTypes.BIGINT,
      valor: DataTypes.DECIMAL(10, 2),
    },

    { timestamps: false, tableName: 'Ativos', underscored: true },
  );

  return Ativo;
};



module.exports = Ativo;