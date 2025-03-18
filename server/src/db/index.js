import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'

const connectDB = async () => {
    try {
        const mongoDBConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MONGODB CONNECTED !!1 CONNECTION HOST : , ${mongoDBConnectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB CONNECTION FAILED" , error);
        process.exit(1);
    }
}

export default connectDB; 