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
        slot_start: {
            type: Date,
            required: true,
        },
        slot_end: {
            type: Date,
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