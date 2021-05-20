const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/db.config');
const Publication = require('./publications');

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    onDelete: 'CASCADE',
    references: {
      model: Publication,
      key: 'user_id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

module.exports = User ;