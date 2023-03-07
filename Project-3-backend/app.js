// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

//adyen backend
const config = require('./config') //port + base url
const cors = require('cors')
const corsOptions = {
    origin: '*',
}
//different domains, ports, etc
const baseUrl = config.baseUrl;
const port = config.port;

const app = express();

//adyen middleware
app.use(express.json())//middleware - req.res type cast
app.use(cors(corsOptions));//middleware - cross origin

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// had to comment this out because it crashes otherwise
// require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use(indexRoutes);

const userRoutes = require('./routes/auth/user.routes')
app.use(userRoutes)

const productRoutes = require('./routes/auth/product.routes')
app.use(productRoutes)

const reviewRoutes = require('./routes/auth/review.routes')
app.use(reviewRoutes)

const authRoutes = require('./routes/auth/auth.routes')
app.use(authRoutes)



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
