module.exports = (sequelize, DataTypes) => sequelize.define('pictures', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
