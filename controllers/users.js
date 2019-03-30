const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/user");
const Quota = require("../models/quota");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  const getQuery = User.findOne({_id: userId}).populate('quota');
  getQuery.then((user) => {
    res.status(200).json({
      message: "User fetched successfully!",
      user,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching user failed!"
    });
  });
}

exports.getUsers = (req, res, next) => {
  const getQuery = User.find().populate('quota');
  getQuery.then((users) => {
    res.status(200).json({
      message: "User fetched successfully!",
      users,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching users failed!"
    });
  });
}

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  const deleteQuery = User.deleteOne({_id: userId});
  deleteQuery.then((result) => {
    if (result.n > 0) {
      res.status(200).json({
        message: "User deleted successfully!",
      });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching user failed!"
    });
  });
}

exports.updateUser = (req, res, next) => {
  if (req.body.emailChanged) {
    User.findOne({ email: req.body.user.email }).then(user => {
      if (user) {
        res.status(401).json({
          duplicated: true
        });
      } 
    });
  }

  const newUser = req.body.user;
  const user = new User({
    ...newUser,
    _id: newUser.id,
    quota: newUser.quota.id,
  })
  const putQuery = User.updateOne({_id: user._id}, user);
  putQuery.then((result) => {
    if (result.n > 0) {
      res.status(200).json({
        message: "User updated successfully!",
      });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Updating user failed!"
    });
  });
}

exports.listUsers = (req, res, next) => {
  const getQuery = User.find();
  getQuery.then((users) => {
    res.status(200).json({
      message: "Users fetched successfully!",
      users,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching users failed!"
    });
  });
}

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
      iban: req.body.iban,
      isAdmin: req.body.isAdmin,
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
          message: "Credenciales no válidos"
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
          message: "Credenciales no válidos"
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
        userId: fetchedUser._id,
        userAdmin: fetchedUser.isAdmin,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Credenciales no válidos"
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
