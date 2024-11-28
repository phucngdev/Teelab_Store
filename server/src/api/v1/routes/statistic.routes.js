const statisticRoutes = require("express").Router();
const statisticController = require("../controllers/statistics.controller");
const verifyToken = require("../middlewares/verifyToken");

// trang dashboard
statisticRoutes.get(
  "/dashboard",
  verifyToken.verifyTokenHandleAdmin,
  statisticController.dashboard
);

module.exports = { statisticRoutes };
