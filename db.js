import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export default function databaseConnect() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));
}