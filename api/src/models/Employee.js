const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Employees', {
    primerNombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    segundoNombre: {
      type: DataTypes.STRING
    },
    primerApellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    segundoApellido: {
      type: DataTypes.STRING
    },
    foto: {
      type: DataTypes.TEXT
    },
    curriculumVitae: {
      type: DataTypes.TEXT
    },
    puesto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, { timestamps: false });
};