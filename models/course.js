const mongoose = require("mongoose"),
    { Schema } = mongoose,
    courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    maxStudents: {
        type: Number,
        min: [1000, "Zip Code too short"],
        max: 99999
    },
    cost: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative cost"]
    }
},{
    timestamps: true
}
);

module.exports = mongoose.model("Course", courseSchema);