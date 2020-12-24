"use strict";

const httpStatus = require("http-status-codes");

module.exports = {
    logRequestPaths : (req, res, next) => {
    console.log(`Request made to ${req.url}`);
    next();
},
    pageNotFound : (req, res) => {
    let errorCode = httpStatus.NOT_FOUND; 
    res.status(errorCode);
    res.send("error"); 
},
    internalServerError : (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`Error occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry the application is taking a nap`);
}
};