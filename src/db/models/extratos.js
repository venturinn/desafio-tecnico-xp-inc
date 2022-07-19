const Extrato = (sequelize, DataTypes) => {
  const Extrato = sequelize.define(
    "Extrato",
    {
      codOperacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codAtivo: DataTypes.STRING,
      codCliente: DataTypes.INTEGER,
      qtdeAtivo: DataTypes.BIGINT,
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