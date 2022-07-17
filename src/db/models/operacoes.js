const Operacao = (sequelize, DataTypes) => {
  const Carteira = sequelize.define(
    "Operacao",
    {
      CodOperacao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      QtdeAtivo: DataTypes.BIGINT,
      OperacaoX: {
        allowNull: false,
        type: DataTypes.STRING(1),
      },
      createdAt: { type: "TIMESTAMP", field: "Data" },
    },

    {
      timestamps: true,
      updatedAt: false,
      tableName: "Operacoes",
      underscored: true,
    }
  );

/*   Operacao.associate = (models) => {
    models.Ativo.belongsToMany(models.Cliente, {
      as: "Clientes",
      through: Operacao,
      foreignKey: "CodAtivo",
      otherKey: "CodCliente",
    });
    models.Cliente.belongsToMany(models.Ativo, {
      as: "Ativos",
      through: Operacao,
      foreignKey: "CodCliente",
      otherKey: "CodAtivo",
    });
  }; */

  return Operacao;
};

module.exports = Operacao;
