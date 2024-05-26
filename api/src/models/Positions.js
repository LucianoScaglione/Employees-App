const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Positions', {
    puesto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });
};