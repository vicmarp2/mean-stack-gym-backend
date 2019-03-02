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
