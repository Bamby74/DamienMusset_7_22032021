const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const User = require("../models/user");
<<<<<<< HEAD
require('dotenv').config();

let JWT_TOKEN = process.env.TOKEN_KEY;
=======
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)

exports.signup = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((userFound) => {
      if (userFound) {
        res
          .status(400)
          .json({ error: "Cet utilisateur posséde déjà un compte ! " });
        return;
      }
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const data = {
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: hash,
          username: req.body.username,
          isAdmin: false
        };
        let { name, surname, email, password, username, isAdmin } = data;
        User.create({
          name,
          surname,
          email,
          password,
          username,
          isAdmin
        })
        .then((newUser) =>{
          res.status(201).json({ 
            userId: newUser.id,
            token: jwt.sign(
                { userId: newUser.id },
                JWT_TOKEN,
                { expiresIn: "24h" }
              ),
          })
        })
        .catch((error) =>
            res
              .status(400)
              .json({ error: "Impossible d'ajouter cet utilisateur !" })
          );
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((userFound) => {
      if (!userFound) {
        return res
        .status(401)
        .json({ error: "Compte utilisateur non trouvé!" });
      }
        bcrypt.compare(req.body.password, userFound.password)
            .then((resBcrypt) => {
                if (!resBcrypt) {
                return res
                    .status(401)
                    .json({ error: "Mot de passe incorrect !" });
                }
                res.status(200).json({
                userId: userFound.id,
                token: jwt.sign(
                    { userId: userFound.id },
<<<<<<< HEAD
                    JWT_TOKEN,
                    { expiresIn: "24h" },
                    ),
                isAdmin: userFound.isAdmin
=======
                    "095883nedfnejcnjdw94584o2dmenx39r2",
                    { expiresIn: "24h" }
                ),
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
            });
          })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUserProfil = (req, res) => {
  User.findOne({
    attributes: ["id", "name", "surname", "email", "username"],
<<<<<<< HEAD
    where: { id: req.token.userId },
=======
    where: { id: req.userId },
>>>>>>> 64cf00f (Ajout dossier backend et dossier frontend)
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "Utilisateur introuvable !" });
      }
      res.status(200).json(user); 
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.updateUserProfil = (req, res) => {
  let username = req.body.username;

  User.findOne({
    attributes: ["id", "username"],
    where: { id: req.token.userId },
  })
    .then((userFound) => {
      userFound
        .update({ username: username ? username : userFound.username })
        .then((userFoundUpdated) => res.status(200).json(userFoundUpdated))
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(400).json(error));
};

exports.deleteUserProfil = (req, res) => {
  User.findOne({
    where: { id: req.token.userId },
  })
    .then((userFound) => {
      userFound
        .destroy()
        .then((userDestroyed) => res.status(200).json({ message: "Compte supprimé!" }))
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(400).json(error))
}
