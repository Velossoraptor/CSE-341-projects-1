const express = require("express");
const router = express.Router(); // Create a router instance
// ^ was typing express().Router() which is incorrect, should be express.Router() (no paren after express)

const usersController = require("../controllers/users");

router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

module.exports = router;