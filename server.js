const express = require('express');
const dbConnect = require('./database/index');
const {PORT} = require('./config/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser');
const cors = require('cors')

// const corsOptions = {
//     credentials: true, // Allows credentials (cookies, authorization headers) to be sent cross-origin
//     origin: ["http://localhost:3000"], // Specifies which domains are allowed to access this backend
// };

const app = express(); // Creates an instance of an Express application

 // Middleware to parse cookies from incoming requests

//  app.use(cors(corsOptions)); // Enables Cross-Origin Resource Sharing (CORS) with specified options
app.use(
    cors({
    origin: function (origin, callback) {
    return callback (null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
})
);




 // Handle preflight requests globally
  // Enable CORS for the refresh endpoint
 
  // Preflight request handling for all routes

 app.use(cookieParser());

app.use(express.json({ limit: '50mb' })); // Middleware to parse incoming JSON requests, with a size limit of 50MB

app.use(router); // Mounts the main router for handling API routes

dbConnect(); // Calls a function to establish a connection to the database

app.use('/storage', express.static('storage')); 
// Serves static files (like images, PDFs) from the 'storage' folder when accessed via '/storage' URL

app.use(errorHandler); // Middleware for handling errors globally

app.listen(PORT, console.log(`backend is running at ${PORT}`)); 
// Starts the server on the specified PORT and logs a message
