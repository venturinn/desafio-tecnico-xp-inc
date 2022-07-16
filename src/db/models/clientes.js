const Cliente = (sequelize, DataTypes) => {
  const Cliente = sequelize.define(
    'Cliente',
    {
      CodCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nome: DataTypes.STRING,
      Email: DataTypes.STRING,
      Saldo: DataTypes.DECIMAL(65, 2),
      Senha: DataTypes.STRING,
    },

    { timestamps: false, tableName: 'Clientes', underscored: true },
  );

  return Cliente;
};

module.exports = Cliente;
