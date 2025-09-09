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

const createNew = async (req, res) =>{ // Async function to create a new contact
    const collection = await mongodb.getDb().db("Test").collection("contacts");
    collection.insertOne(req.body, (error, result)=>{
        if(error){
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
    console.log(req.body);
    // Need to return new contact id in response body
}

const updateContact = async (req, res) =>{ // Async function to update a contact by ID
    const userIdToModify = new ObjectId(req.params.id);
    const collection = await mongodb.getDb().db("Test").collection("contacts");
    collection.updateOne(
        {_id: userIdToModify},
        {$set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }}
    );
    console.log(req.body);
    console.log("updated contact " + userIdToModify);
    // Need to return successful http code in response
}

const deleteContact = async (req, res) =>{ // Async function to delete a contact by ID
    const userIdToDelete = new ObjectId(req.params.id);
    const collection = await mongodb.getDb().db("Test").collection("contacts");
    collection.deleteOne({_id: userIdToDelete});
    console.log("deleted contact " + userIdToDelete);
    // Need to return successful http code in response
}

module.exports = {
    getAll,
    getSingle,
    createNew,
    updateContact,
    deleteContact,
};