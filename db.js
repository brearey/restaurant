import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

function databaseConnect() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error DB onnect', err));
}

export default databaseConnect;