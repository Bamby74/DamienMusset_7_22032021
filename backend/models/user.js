const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/db.config');
<<<<<<< HEAD
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
=======

const User = db.define('user', {
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
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
<<<<<<< HEAD
    unique: true
=======
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
<<<<<<< HEAD
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
=======
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
})

module.exports = User ;