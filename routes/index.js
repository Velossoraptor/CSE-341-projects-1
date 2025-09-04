const express = require("express");
const router = express.Router(); // Create a router instance
// ^ was typing express().Router() which is incorrect, should be express.Router() (no paren after express)

router.get("/", (req, res) => { // Default Hello World so that we're friendly :)
    res.send("Hello World!");
});

router.use("/contacts", require("./contacts")); // Routes all /users requests to contacts.js

module.exports = router;