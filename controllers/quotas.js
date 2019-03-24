const quotas = [
    {
      title: 'Bono 1 día',
      numberOfPayments: 1,
      pricePerMonth: 5,
      periodInMonths: 0,
      isCardNeeded: false,
      cardPrice: 0,
    },
    {
      title: 'Cuota 1 mes',
      numberOfPayments: 1,
      pricePerMonth: 25,
      periodInMonths: 1,
      isCardNeeded: true,
      cardPrice: 10,
    },
    {
      title: 'Cuota 3 meses',
      numberOfPayments: 3,
      pricePerMonth: 20,
      periodInMonths: 3,
      isCardNeeded: true,
      cardPrice: 10,
    },
    {
      title: 'Cuota 6 meses',
      numberOfPayments: 6,
      pricePerMonth: 15,
      periodInMonths: 6,
      isCardNeeded: true,
      cardPrice: 10,
    },
    {
      title: 'Cuota 12 meses',
      numberOfPayments: 12,
      pricePerMonth: 10,
      periodInMonths: 12,
      isCardNeeded: true,
      cardPrice: 10,
    },
  ];

const Quota = require('../models/quota.js');

exports.getQuotas = (req, res, next) => {
  const getQuery = Quota.find();
  getQuery.then((quotas) => {
    res.status(200).json({
      message: "Quotas fetched successfully!",
      quotas,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching quotas failed!"
    });
  });
}


exports.deleteQuota = (req, res, next) => {
  const id = req.params.id;
  const deleteQuery = Quota.deleteOne({_id: id});
  deleteQuery.then((result) => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Quota deleted successfully!",
      });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Quota failed!"
    });
  });
}

exports.updateQuota = (req, res, next) => {
  const newQuota = req.body.quota;
  const quota = new Quota({
    ...newQuota,
    _id: newQuota.id,
  })
  const putQuery = Quota.updateOne({_id: quota._id}, quota);
  putQuery.then((result) => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Quota updated successfully!",
      });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Updating Quota failed!"
    });
  });
}

exports.createQuota = (req, res, next) => {

  const quota = new Quota({
    ...req.body.quota
  });
  quota.save().then(result => {
    res.status(201).json({
      message: "Quota created!",
      quota: result
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Invalid authentication credentials!"
    });
  });
}
