const express = require('express');
const router = express.Router(); // Create a router instance
// ^ was typing express().Router() which is incorrect, should be express.Router() (no paren after express)

const contactsController = require('../controllers/contacts'); // Import the contacts controller

router.get('/', contactsController.getAll); // Routes all /users requests to contacts.js getAll function

router.get('/:id', contactsController.getSingle); // Routes all /users/:id requests to contacts.js getSingle function

module.exports = router;
