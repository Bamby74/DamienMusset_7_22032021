const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/db.config');
const User = require('./user');

const Post = () => {
  const Publication = db.define('publication', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
    },
    attachment: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    }
  })
  Publication.belongsTo(User, {
    foreignKey: 'user_id',
  });
  return Publication
}

module.exports = Post() ;