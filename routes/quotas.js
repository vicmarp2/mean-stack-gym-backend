const express = require("express");

const QuotasController = require("../controllers/quotas");

const router = express.Router();

router.get("", QuotasController.getQuotas);

router.post("/create", QuotasController.createQuota);

router.put("/edit", QuotasController.updateQuota);

router.delete("/:id", QuotasController.deleteQuota);

module.exports = router;