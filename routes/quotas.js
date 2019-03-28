const express = require("express");

const QuotasController = require("../controllers/quotas");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("", QuotasController.getQuotas);

router.post("/create", checkAuth, QuotasController.createQuota);

router.put("/edit", checkAuth, QuotasController.updateQuota);

router.delete("/:id", checkAuth, QuotasController.deleteQuota);

module.exports = router;