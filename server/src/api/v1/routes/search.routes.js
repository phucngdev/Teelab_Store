const searchRoutes = require("express").Router();
const searchController = require("../controllers/search.controller");
const verifyToken = require("../middlewares/verifyToken");

// tìm kiếm toàn cục
searchRoutes.get("/global", searchController.searchGlobal);

module.exports = { searchRoutes };
