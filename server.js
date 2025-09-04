const express = require('express');
const app = express();

// Just visciously gutted everything, need to restart from scratch. 
// Get project to display hello world and freaking COMMIT for the love

const PORT = process.env.PORT || 3000;

app.use("/", require("./routes")); // Routes all requests to routes folder

app.listen(PORT, () => { // Monitors port 3000 on local host
    console.log(`Server is running on port ${PORT}`); //confirmation message
});