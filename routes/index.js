const express = require("express");
const router = express.Router(); // Create a router instance
// ^ was typing express().Router() which is incorrect, should be express.Router() (no paren after express)

router.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = router;