import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    spec: {
        type: String,
        required: true,
    },
    slots: [{
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        isBooked: {
            type: Boolean,
            required: true,
        },
    }],
}, {
    timestamps: true,
});

export default mongoose.model('Restaurant', RestaurantSchema);