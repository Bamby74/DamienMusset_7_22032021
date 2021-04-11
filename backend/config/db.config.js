const {Sequelize} = require ('sequelize');

const sequelize = new Sequelize('GROUPOMANIA','postgres', 'Damelis3', {
    dialect: 'postgres',
    host:'localhost'
});
 sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données réussie !'))
    .catch(e => console.error('Impossible de se connecter à la base de donnée !',e));

module.exports = sequelize;