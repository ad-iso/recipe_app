"use strict";

var courses = [
    {
        title: "Event Driven Cakes",
        cost: 50
    },
    {
        title:"Asynchronous Artichoke",
        cost: 50
    },
    {
        title: "Object Oriented Orange Juice",
        cost: 50
    }
];

module.exports = {
    index:(req, res) => {
        res.render("index");
    },
    
    showCourses : (req, res) => {
    res.render("courses", {
        offeredCourses: courses
    });
},     
    logRequestPaths : (req, res, next) => {
    console.log(`Request made to ${req.url}`);
    next();
}
};
