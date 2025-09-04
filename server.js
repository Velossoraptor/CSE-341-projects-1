// Adding all necessary modules
const express = require('express');
const app = express();
const mongodb = require('./db/connect');

// ITS WORKINGGGGG!!!!
// YIPPEE YIPPEE

const PORT = process.env.PORT || 3300;

app.use("/", require("./routes")); // Routes all requests to routes folder

mongodb.initDb((err) =>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(PORT, () => { // Monitors port 3000 on local host
            console.log(`Server is running on port ${PORT}`); //confirmation message
        });
    }
});


