const express = require("express");
const router = express.Router();

const repairsController = require("../controllers/repairs.controller.js");

router
  .route("/")
    .get(repairsController.repairsFind)
  .post(repairsController.repairCreate);

router
  .route("/:id")
  .get(repairsController.repairFind)
  .patch(repairsController.repairUpdate)
  .delete(repairsController.repairDelete);

module.exports = router
