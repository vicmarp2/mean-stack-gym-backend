const express = require("express");

const QuotasController = require("../controllers/quotas");

const router = express.Router();

router.get("", QuotasController.getQuotas);

module.exports = router;