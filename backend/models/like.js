const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/db.config');
const { stack } = require('../routes/publication');
const Publication = require('./publications');
const User = require('./user');

const likePosted = () => {
    const Like = db.define('likes', {
        publicationid: {
            type: DataTypes.INTEGER,
            references: {
                model: Publication,
                key: 'id'
            }
        },
        userid: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    })
    User.belongsToMany(Publication, {
        onDelete: 'CASCADE',
        through: Like,
        foreignKey: 'userid',
        otherkey: 'publicationid'
    });

    Publication.belongsToMany(User, {
        onDelete: 'CASCADE',
        through: Like,
        foreignKey: 'publicationid',
        otherKey: 'userid'
    });

    Like.belongsTo(User, {
        foreignKey: 'userid',
        // as: 'user',
    });

    Like.belongsTo(Publication, {
        foreignKey: 'publicationid',
        // as: 'publication',
    });
    return Like
}

module.exports = likePosted();