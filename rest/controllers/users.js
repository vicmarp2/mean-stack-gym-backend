const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../../models/user");
const Reservation = require("../../models/reservation");

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  const getQuery = User.findOne({_id: userId}).populate('quota');
  getQuery.then((user) => {
    res.status(200).json({
      message: "User fetched successfully!",
      user,
    });
  }).catch(error => {
    res.status(404).json({
      message: "Fetching user failed!"
    });
  });
}

exports.getUsers = (req, res, next) => {
  const getQuery = User.find().populate('quota');
  getQuery.then((users) => {
    res.status(200).json({
      message: "Users fetched successfully!",
      users,
    });
  }).catch(error => {
    res.status(404).json({
      message: "Fetching users failed!"
    });
  });
}



exports.getUserAccess = (req, res, next) => {
  let access = false;
  const userId = req.params.userId;
  const getQuery = User.findOne({_id: userId}).populate('quota');
  getQuery.then((user) => {
    if (user.endDate > new Date()) {
      access = true;
      // si es bono de un día seteamos el fin de validez al momento actual
      if (user.quota.periodInMonths === 0) {
        User.findOneAndUpdate({_id: userId}, { $set: {endDate: new Date()}}).exec();
      }
    }
    res.status(200).json({
      access
    });
  }).catch(error => {
    res.status(404).json({
      message: "Fetching users failed!"
    });
  });
}



exports.getUserAccessToEvent = (req, res, next) => {
  let access = false;
  const userId = req.query.userId;
  const eventId = req.query.eventId;
  console.log(userId);
  console.log(eventId);
  const getQuery = User.findOne({_id: userId}).populate('quota');
  getQuery.then((user) => {
    let start = new Date();
    start.setHours(0,0,0,0);
    let end = new Date();
    end.setHours(23,59,59,999);
    Reservation.findOne({user: user._id, event: eventId, exactDate: {$gte: start, $lt: end}}).then((reservation) => {
      console.log(reservation);
      if (reservation) {
        access = true;
        res.status(200).json({
          access
        });
      } else {
        res.status(401).json({
          message: "No reservation found",
        })
      }
     
    }).catch(error => {
      res.status(401).json({
        message: "No reservation found",
      })
    })
  }).catch(error => {
    res.status(404).json({
      message: "Fetching user failed!"
    });
  });
}
