const Extrato = (sequelize, DataTypes) => {
  const Extrato = sequelize.define(
    "Extrato",
    {
      cod_operacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cod_ativo: DataTypes.INTEGER,
      cod_cliente: DataTypes.INTEGER,
      qtde_ativo: DataTypes.BIGINT,
      valor:{
        allowNull: false,
        type: DataTypes.DECIMAL(65, 2),
      },
      operacao: {
        allowNull: false,
        type: DataTypes.STRING(),
      },
      createdAt: { type: "TIMESTAMP", field: "Data" },
    },

    {
      timestamps: true,
      updatedAt: false,
      tableName: "Extratos",
      underscored: true,
    }
  );
  return Extrato;
};

module.exports = Extrato;