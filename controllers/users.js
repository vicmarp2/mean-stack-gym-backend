const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Quota = require("../models/quota");

exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(401).json({
        message: "Usuario ya dado de alta"
      });
    }
  });

  User.findOne({ dni: req.body.dni }).then(user => {
    if (user) {
      return res.status(401).json({
        message: "Usuario ya dado de alta"
      });
    }
  });

  let userQuotaId = "";
  const quotaQuery = Quota.findOne({ title: req.body.quota.title });
  quotaQuery.then(quota => {
    userQuotaId = quota._id;
  });
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      dni: req.body.dni,
      email: req.body.email,
      password: hash,
      name: req.body.name,
      surname: req.body.surname,
      quota: userQuotaId,
      purchaseDate: req.body.purchaseDate,
      endDate: req.body.endDate,
      contactNumber: req.body.contactNumber,
      birthdate: req.body.birthdate,
      address: req.body.address,
      postalCode: req.body.postalCode,
      city: req.body.city,
      iban: req.body.iban
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          user: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
};


exports.createFreeUser = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(401).json({
        message: "Usuario ya dado de alta"
      });
    }
  });

  User.findOne({ dni: req.body.dni }).then(user => {
    if (user) {
      return res.status(401).json({
        message: "Usuario ya dado de alta"
      });
    }
  });

  let userQuotaId = "";
  const quotaQuery = Quota.findOne({ title: req.body.quota.title });
  quotaQuery.then(quota => {
    userQuotaId = quota._id;
  });
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      dni: req.body.dni,
      email: req.body.email,
      password: hash,
      name: req.body.name,
      surname: req.body.surname,
      quota: userQuotaId,
      purchaseDate: req.body.purchaseDate,
      endDate: req.body.endDate,
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          user: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
};

exports.checkDuplicatedUser = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(200).json({
        duplicated: true
      });
    } else {
      return res.status(200).json({
        duplicated: false
      });
    }
  });
};

exports.checkDuplicatedDNI = (req, res, next) => {
  User.findOne({ dni: req.body.dni }).then(user => {
    if (user) {
      return res.status(200).json({
        duplicated: true
      });
    } else {
      return res.status(200).json({
        duplicated: false
      });
    }
  });
};
