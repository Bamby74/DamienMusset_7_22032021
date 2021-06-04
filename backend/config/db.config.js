const {Sequelize} = require ('sequelize');

const sequelize = new Sequelize("GROUPOMANIA",process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST
});
 sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données réussie !'))
    .catch(e => console.error('Impossible de se connecter à la base de donnée !',e));

module.exports = sequelize;