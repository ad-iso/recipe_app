const Subscriber = require("../models/subscriber");

module.exports = {
    index : ( req, res, next ) => {
    Subscriber.find({})
    .then(subscribers => {
        res.locals.subscribers = subscribers;
        next();
    })
    .catch((error) =>{
        console.log(`Error finding subscribers ${error.message}`);
        next(error);
    })
    .then(()=>{
        console.log(`promise complete`)
    });
},  
    indexView: ( req, res ) => {
        res.render("subscribers/index");
},

    new: ( req, res ) => {
        res.render("subscribers/new");
},

    create: ( req, res, next ) => {
        let subscriberParams = {
            name : req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        };

        Subscriber.create(subscriberParams)
        .then(subscriber => {
            res.locals.redirect = "/subscribers";
            res.locals.subscriber = subscriber;
            next();
        })
        .catch(error => {
            console.log(`Error saving subscriber: ${error.message}`);
            next(error);
        });
},
    redirectView: ( req, res, next ) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: ( req, res, next ) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
        .then(subscriber => {
            res.locals.subscriber = subscriber;
            next();
        })
        .catch( error => {
            console.log(`Error fetching this subscriber ${error.message}`);
            next(error);
        });
    },
    showView: ( req, res ) => {
        res.render("subscribers/show");
    },

    edit: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
        .then(subscriber => {
            res.render("subscribers/edit", {
                subscriber: subscriber
            });
        })
        .catch(error => {
            console.log(`Error fectching by subscriberId ${error.message}`);
            next(error);
        })
    },
    update: (req, res, next) => {
        let subscriberId = req.params.id;
        subscriberParams = {
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        };
        Subscriber.findByIdAndUpdate(subscriberId, {
            $set: subscriberParams
        })
        .then( subscriber => {
            res.locals.redirect = `/subscribers/${suscriberId}`;
            res.locals.subscriber = subscriber;
            next();
        })
        .catch(error => {
            console.log(`Error updating the subscriber by ID: ${error.message}`);
            next(error);
        })
    }
};