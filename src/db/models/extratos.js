const Extrato = (sequelize, DataTypes) => {
  const Extrato = sequelize.define(
    "Extrato",
    {
      CodOperacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CodAtivo: DataTypes.INTEGER,
      CodCliente: DataTypes.INTEGER,
      QtdeAtivo: DataTypes.BIGINT,
      Valor:{
        allowNull: false,
        type: DataTypes.DECIMAL(65, 2),
      },
      Operacao: {
        allowNull: false,
        type: DataTypes.STRING(),
      },
      createdAt: { type: "TIMESTAMP", field: "Data" },
    },

    {
      timestamps: true,
      updatedAt: false,
      tableName: "Extratos",
      underscored: false,
    }
  );
  return Extrato;
};

module.exports = Extrato;