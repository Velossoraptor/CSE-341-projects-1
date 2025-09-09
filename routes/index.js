const express = require('express');
const router = express.Router(); // Create a router instance
// ^ was typing express().Router() which is incorrect, should be express.Router() (no paren after express)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

router.get('/', (req, res) => {
  // Default Hello World so that we're friendly :)
  res.send('Hello World! Type /contacts to see contact routes.');
});

router.use('/contacts', require('./contacts')); // Routes all /users requests to contacts.js

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

module.exports = router;
