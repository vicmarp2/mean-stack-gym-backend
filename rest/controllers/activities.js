const Activity = require('../../models/activity.js');
const Event = require('../../models/event.js');
const Reservation = require('../../models/reservation.js');


exports.getActivities = (req, res, next) => {
  const getQuery = Activity.find().populate('events');
  getQuery.then((activities) => {
    res.status(200).json({
      message: "Activities fetched successfully!",
      activities,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching activities failed!"
    });
  });
}

  exports.getActivity = (req, res, next) => {
    const activityId = req.params.id;
    const getQuery = Activity.findOne({_id: activityId}).populate('events');
    getQuery.then((activities) => {
      res.status(200).json({
        message: "Activity fetched successfully!",
        activities,
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching activity failed!"
      });
    });
  }

  exports.getUserReservations = (req, res, next) => {
    const userId = req.params.id;
    const getQuery = Reservation.find({user: userId}).populate('event');
    getQuery.then((reservations) => {
      res.status(200).json({
        message: "Reservations fetched successfully!",
        reservations,
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching reservation failed!"
      });
    });
  }


  exports.getEventReservations = (req, res, next) => {
    const eventId = req.params.id;
    const getQuery = Reservation.findOne({event: eventId}).populate('user').populate('event');
    getQuery.then((reservations) => {
      res.status(200).json({
        message: "Reservations fetched successfully!",
        reservations,
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching reservation failed!"
      });
    });
  }