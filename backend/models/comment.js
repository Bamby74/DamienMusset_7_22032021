const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/db.config');
const Publication = require('./publications');
const User = require('./user');

const commentPublication = () => {
    const Comment = db.define('coments', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            onDelete: 'CASCADE',
        },
        publication_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Publication,
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    User.belongsToMany(Publication, {
        onDelete: 'CASCADE',
        through: Comment,
        foreignKey: 'user_id',
        otherkey: 'publication_id'
    });

    Publication.belongsToMany(User, {
        onDelete: 'CASCADE',
        through: Comment,
        foreignKey: 'publication_id',
        otherKey: 'user_id'
    });

    Comment.belongsTo(User, {
        foreignKey: 'user_id',
        // as: 'user',
    });

    Comment.belongsTo(Publication, {
        foreignKey: 'publication_id',
        // as: 'publication',
    });
    return Comment
}

module.exports = commentPublication();