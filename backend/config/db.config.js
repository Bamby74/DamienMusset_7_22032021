const {Sequelize} = require ('sequelize');

<<<<<<< HEAD
const sequelize = new Sequelize("GROUPOMANIA",process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST
=======
const sequelize = new Sequelize('GROUPOMANIA','postgres', 'Damelis3', {
    dialect: 'postgres',
    host:'localhost'
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
});
 sequelize.authenticate()
    .then(() => console.log('Connexion à la base de données réussie !'))
    .catch(e => console.error('Impossible de se connecter à la base de donnée !',e));

module.exports = sequelize;