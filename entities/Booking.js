import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
    },
    slot_index: {
        type: Number,
        required: true,
    },
    guest_count: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Booking', BookingSchema);