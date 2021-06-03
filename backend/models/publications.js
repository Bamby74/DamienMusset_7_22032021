const {Sequelize, DataTypes} = require('sequelize');
<<<<<<< HEAD
=======
const sequelize = require('../config/db.config');
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
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
<<<<<<< HEAD
    user_id: {
=======
    userId: {
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    }
  })
<<<<<<< HEAD
  Publication.belongsTo(User, {
    foreignKey: 'user_id',
  });
=======
  Publication.belongsTo(User);
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
  return Publication
}

module.exports = Post() ;