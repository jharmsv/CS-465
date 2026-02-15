const express = require("express");
const router = express.Router();

// This is where we import the controllers to routr
const tripsController = require("../controllers/trips");

// Define route for trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

// GET Method routes tripFindByCode - requires a param
router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);
    

module.exports = router;