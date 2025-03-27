const express = require("express");
const app = express();

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Fallback to default port if not set in .env
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;



app.listen(PORT, function(){
    console.log(`Server running on :http://localhost:${PORT}`)
})