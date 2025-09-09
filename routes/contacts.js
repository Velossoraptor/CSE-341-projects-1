const express = require('express');
const router = express.Router(); // Create a router instance
// ^ was typing express().Router() which is incorrect, should be express.Router() (no paren after express)
const bodyParser = require('body-parser'); // Import body-parser to parse JSON request bodies

router.use(bodyParser.json()); // Use body-parser middleware to parse JSON

const contactsController = require('../controllers/contacts'); // Import the contacts controller

router.get('/', contactsController.getAll); // Routes all /contacts requests to contacts.js getAll function

router.get('/:id', contactsController.getSingle); // Routes all /contacts/:id requests to contacts.js getSingle function

router.post('/', contactsController.createNew); // Routes all POST /contacts requests to contacts.js createNew function

router.put('/:id', contactsController.updateContact); // Routes all PUT /contacts/:id-to-modify requests to contacts.js updateContact function

router.delete('/:id', contactsController.deleteContact); // Routes all DELETE /contacts/:id-to-delete requests to contacts.js deleteContact function

module.exports = router;
