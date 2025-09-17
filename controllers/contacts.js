const mongodb = require('../db/connect'); // Import the database connection module

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // Async function to get all contacts
  const result = await mongodb
    .getDb()
    .db('Test')
    .collection('contacts')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts); // Return the contacts as JSON with success status
    });
};

const getSingle = async (req, res) => {
  // Async function to get a single contact by ID
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('Test')
    .collection('contacts')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contacts[0]); // Return the first contact found and success status
    });
};

const createNew = async (req, res) => {
  // Async function to create a new contact
  try {
    const collection = await mongodb.getDb().db('Test').collection('contacts');
    const result = await collection.insertOne(req.body, (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
    });
    res.status(200).send(result.insertedId); // Return the ID of the newly created contact
    console.log(result.insertedId); // Log the ID of the newly created contact
  } catch (err) {
    res
      .status(500)
      .send(
        'Error 500: Encountered an Error while Creating New Contact\n Error:' +
          err
      ); // If there is some other error, return a 500 status and the error message
  }
};

const updateContact = async (req, res) => {
  // Async function to update a contact by ID
  try {
    const userIdToModify = new ObjectId(req.params.id);
    const collection = await mongodb.getDb().db('Test').collection('contacts');
    const result = await collection.updateOne(
      { _id: userIdToModify },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          favoriteColor: req.body.favoriteColor,
          birthday: req.body.birthday,
        },
      }
    );
    if (result.matchedCount === 0) {
      return res
        .status(404)
        .send('Error 404: No contact found with id: ' + req.params.id);
    }
    res.status(200).send('Updated Id:' + req.params.id); // Success status and return the ID of the updated contact
    console.log(req.body);
    console.log('updated contact ' + userIdToModify);
  } catch (err) {
    res
      .status(500)
      .send(
        'Error 500: Encountered an Error while Updating ID: ' +
          req.params.id +
          '\n Error:' +
          err
      ); // If there is some other error, return a 500 status and the error message
  }
};

const deleteContact = async (req, res) => {
  // Async function to delete a contact by ID
  try {
    const userIdToDelete = new ObjectId(req.params.id);
    const collection = await mongodb.getDb().db('Test').collection('contacts');
    const result = await collection.deleteOne({ _id: userIdToDelete });

    if (result.deletedCount === 0) {
      // If no documents were deleted, return a 404 status
      return res
        .status(404)
        .send('Error 404: No contact found with id: ' + req.params.id);
    }
    res.status(200).send('Deleted Id:' + req.params.id); // Success status and return the ID of the deleted contact
    console.log('deleted contact ' + userIdToDelete);
  } catch (err) {
    res
      .status(500)
      .send(
        'Error 500: Encountered an Error while Deleting ID: ' +
          req.params.id +
          '\n Error:' +
          err
      ); // If there is some other error, return a 500 status and the error message
  }
};

module.exports = {
  getAll,
  getSingle,
  createNew,
  updateContact,
  deleteContact,
};
