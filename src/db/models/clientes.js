const Cliente = (sequelize, DataTypes) => {
  const Cliente = sequelize.define(
    'Cliente',
    {
      cod_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      saldo: DataTypes.DECIMAL(65, 2),
      senha: DataTypes.STRING,
    },

    { timestamps: false, tableName: 'Clientes', underscored: true },
  );

  return Cliente;
};

module.exports = Cliente;
