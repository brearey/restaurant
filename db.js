import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

function databaseConnect() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));
}

export default databaseConnect;