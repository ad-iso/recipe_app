const Course= require("../models/course");

module.exports = {
    index: (req, res, next) => {
    Course.find({})
    .then(courses => {
        res.locals.courses = courses;
        next();
    })
    .catch(error => {
        console.log(`Error fetching course ${error.message}`);
        next(error);
    });
    },
    indexView: (req, res) => {
        res.render("courses/index");
    }
}

