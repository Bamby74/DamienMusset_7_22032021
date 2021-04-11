const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const User = require("../models/user");

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
        };
        let { name, surname, email, password, username } = data;
        User.create({
          name,
          surname,
          email,
          password,
          username,
        })
          .then((newUser) =>
            res.status(201).json({ message: "Utilsateur créé !" })
          )
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
                    "095883nedfnejcnjdw94584o2dmenx39r2",
                    { expiresIn: "24h" }
                ),
            });
          })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUserProfil = (req, res) => {
  User.findOne({
    attributes: ["id", "name", "surname", "email", "username"],
    where: { id: req.userId },
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
    where: { id: req.userId },
  })
    .then((userFound) => {
      userFound
        .update({ username: username ? username : userFound.username })
        .then((userFoundUpdated) => res.status(200).json(userFoundUpdated))
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(400).json(error));
};
