
# DamienMusset_7_22032021

# DamienMusset_7_22032021

Projet 7 - GROUPOMANIA

Pour utiliser le projet, suivez les instructions suivantes :

1- Telecharger le projet

2- Installer PostgreSQL sur votre machine

      Choisissez votre mot de passe d'utilisateur (USER_PASSWORD)
      Gardez le port de base: 5432
      Cochez l'installation de pgAdmin qui va nous servir pour créer notre base de données locale

3- Aller dans votre dossier d'installation de PostgreSQL et ouvrez pgAdmin

      Connectez-vous grâce à votre USER_PASSWORD
      Ouvrez Servers puis PostgreSQL
      Clique droit sur Databases => Create => Database

      Entrez le nom de la base de données = "GROUPOMANIA"



I- Backend

  1- Installer node.js 
  
        cd backend => npm install
        
  2- Dans le dossier backend, créer un fichier " .env " et y définir les variables suivantes :
        
        DB_HOST = localhost
        DB_USER = postgres
        DB_PASSWORD = USER_PASSWORD
        TOKEN_KEY = Définissez une chaine de caractère alphanumérique complexe de votre choix
        
        
3- Exécuter le backend 
        
        npm start



II- Frontend

  1- Aller dans fichier groupomania-project

      cd groupomania-project

  1- Installer npm 
  
        npm install

  3- Exécuter le frontend 
  
        npm run serve


RDV sur localhost:8080 sur votre navigateur !

Bonne utilisation !

