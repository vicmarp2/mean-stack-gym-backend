
const gyms = [
  {
    codName: 'VLC',
    name: 'Herca Valencia',
    address: 'Calle 2, Valencia',
    contactNumber: '612345678',
    openingHours: {
      mondayToFriday: '06:00-01:00',
      weekend: '07:00-23:00'
    },
    coordinates: {
      latitude: 39.476645,
      longitude: -0.355231,
    }
  },
  {
    codName: 'MD',
    name: 'Herca Madrid',
    address: 'Calle 2, Madrid',
    contactNumber: '612345678',
    openingHours: {
      mondayToFriday: '06:00-01:00',
      weekend: '07:00-23:00'
    },
    coordinates: {
      latitude: 40.415666,
      longitude: -3.711124,
    }
  },
  {
    codName: 'BRC',
    name: 'Herca Barcelona',
    address: 'Calle 2, Barcelona',
    contactNumber: '612345678',
    openingHours: {
      mondayToFriday: '06:00-01:00',
      weekend: '07:00-23:00'
    },
    coordinates: {
      latitude: 41.381082,
      longitude: 2.172335,
    }
  },
]

const Gym = require('../models/gym.js');

exports.getGyms = (req, res, next) => {
  const getQuery = Gym.find();
  getQuery.then((gyms) => {
    res.status(200).json({
      message: "Gyms fetched successfully!",
      gyms,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching gyms failed!"
    });
  });
}

exports.getGym = (req, res, next)  => {
  const codName = req.params.codName;
  const getQuery = Gym.findOne({codName});
  getQuery.then((gym) => {
    res.status(200).json({
      message: "Gym fetched successfully!",
      gym,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching gym failed!"
    });
  });
}