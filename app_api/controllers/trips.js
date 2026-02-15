const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - list all trips
// Regardless of outcome, repsonse must include HTMl status code 
// and  JSON message to the requesting client 
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // no filter, return all records 
        .exec();

    // uncomment to show result of query on console
    // console.log(q);

    if (!q || !q.length) {
        // database return no data
        return res
            .status(404)
            .json({ message: "No trips found." });
    }
    else {
        // return resulting trips list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:code  - list a single trip
// Regardless of outcome, repsonse must include HTMl status code 
// and  JSON message to the requesting client 
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode }) // Return single record
        .exec();

    // uncomment to show result of query on console
    console.log(q);

    if (!q || !q.length) {
        // database return no data
        return res
            .status(404)
            .json({ message: "No trips found." });
    }
    else {
        // return resulting trips list
        return res
            .status(200)
            .json(q);
    }
};

// Post: /trips - Add a new trip
// Regsrdless of outcome response must include HTML
// And JSON message to client
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    // uncomment to show result of query on console
    // console.log(q);

    if (!q) {
        // database return no data
        return res
            .status(400)
            .json({ message: "Trip could not be created" });
    }
    else {
        // return resulting trips list
        return res
            .status(201)
            .json(q);
    }

    // uncomment to show result of query on console
    // console.log(q);

};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML statuscode
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();
    if (!q) { // Database returned no data
        return res
            .status(400)
            .json({ message: "Trip could not be updated" });
    } else { // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }
    // Uncomment the following line to show results of
    operation
    // on the console
    // console.log(q);
};

module.exports =
{
    tripsList,
    tripsFindByCode,
    tripsAddTrip, 
    tripsUpdateTrip
};