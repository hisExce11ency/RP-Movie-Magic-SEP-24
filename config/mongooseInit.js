import { connect } from "mongoose";

const dbUrl = "mongodb://localhost:27017/magic-movies";


export default async function mongooseInit() {
    try {
        await connect(dbUrl);
        console.log("Successfuly connected to DB!");
    } catch (err) {
        console.log("Can NOT connect to DB!" + err.message);
    }
}