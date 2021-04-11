const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/db.config');
const Publication = require('./publications');
const User = require('./user');

const likePosted = () => {
    const Like = db.define('likes', {
        publicationId: {
            type: DataTypes.INTEGER,
            references: {
                model: Publication,
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            model: User,
            key: 'id'
        }
    })
    User.belongsToMany(Publication, {through: Like});
    Publication.belongsToMany(User, {through: Like});

    Like.belongsTo(User);
    Like.belongsTo(Publication);
    return Like
}

module.exports = likePosted();