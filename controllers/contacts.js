const mongodb = require("../db/connect"); // Import the database connection module

const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) =>{ // Async function to get all contacts
    const result = await mongodb.getDb().db("Test").collection("contacts").find();
    result.toArray().then((contacts) => { // Convert the result to an array
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts); // Return the contacts as JSON with success status
    });
};

const getSingle = async (req, res) =>{ // Async function to get a single contact by ID
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db("Test").collection("contacts").find({_id: userId}); // Find db called Test, collection called contacts, find by _id
    result.toArray().then((contacts) => { // Convert the result to an array
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]); // Return the first contact found and success status
    });
};

module.exports = {
    getAll,
    getSingle,
};