"use strict";


const express = require("express"),
    app = express(),
    router = express.Router(),
    layouts = require("express-ejs-layouts"),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscriberController = require("./controllers/subscriberController"),
    usersController = require("./controllers/usersController"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ad_iso:Ceaser02ish@cluster0.pvakz.mongodb.net/recipe_db?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once("open", () => {
    console.log(`Now connected to Mongoose`)
});
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());


app.use(homeController.logRequestPaths);

app.use("/", router);

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));

router.get("/", homeController.index);
router.get("/courses", homeController.showCourses);

router.get("/contact", subscriberController.new);
router.get("/subscribers", subscriberController.index, subscriberController.indexView);
router.get("/subscribers/:id", subscriberController.show, subscriberController.showView);
router.post("/subscribers/create", subscriberController.create, subscriberController.redirectView);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.get("/users/:id", usersController.show, usersController.showView)
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.put("/users/:id/update", usersController.update, usersController.redirectView);

app.use(errorController.pageNotFound);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(
        `Now listening on http://localhost${app.get("port")}`);
    });
