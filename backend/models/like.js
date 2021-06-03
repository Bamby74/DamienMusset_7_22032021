const {Sequelize, DataTypes} = require('sequelize');
const db = require('../config/db.config');
<<<<<<< HEAD
const { stack } = require('../routes/publication');
=======
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
const Publication = require('./publications');
const User = require('./user');

const likePosted = () => {
    const Like = db.define('likes', {
<<<<<<< HEAD
        publicationid: {
=======
        publicationId: {
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
            type: DataTypes.INTEGER,
            references: {
                model: Publication,
                key: 'id'
            }
        },
<<<<<<< HEAD
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
=======
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
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
    return Like
}

module.exports = likePosted();