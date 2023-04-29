const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    spec: {
        type: String,
        required: true,
    },
    slots: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);