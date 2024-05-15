const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Users', {
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });
};