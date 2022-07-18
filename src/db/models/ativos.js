const Ativo = (sequelize, DataTypes) => {
  const Ativo = sequelize.define(
    'Ativo',
    {
      cod_ativo: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      qtde_ativo: DataTypes.BIGINT,
      valor: DataTypes.DECIMAL(10, 2),
    },

    { timestamps: false, tableName: 'Ativos', underscored: true },
  );

  return Ativo;
};

module.exports = Ativo;