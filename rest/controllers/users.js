const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../../models/user");


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



exports.getUserAccess = (req, res, next) => {
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



exports.getUserAccessToEvent = (req, res, next) => {
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
