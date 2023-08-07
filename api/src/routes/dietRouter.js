const Router = require("express");
const getDietService = require("../services/dietService");

const router = Router();

router.get("/", getDietService.getDietService)

module.exports = router;