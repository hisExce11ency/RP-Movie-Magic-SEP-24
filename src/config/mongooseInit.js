import { connect } from "mongoose";

export default async function mongooseInit() {
    try {
        const url = process.env.DB_URL || 'mongodb://localhost:27017';
        await connect(url, { dbName: 'magic-movies' });
        console.log('Successfully connected to DB!');
    } catch (err) {
        console.log("Can NOT connect to DB!" + err.message);
    }
}