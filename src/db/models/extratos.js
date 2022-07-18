const Extrato = (sequelize, DataTypes) => {
  const Carteira = sequelize.define(
    "Extrato",
    {
      CodOperacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
      underscored: true,
    }
  );
  return Extrato;
};

module.exports = Extrato;