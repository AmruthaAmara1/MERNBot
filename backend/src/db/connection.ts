import { connect, disconnect } from "mongoose";

//Connection to MongoDB Database
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log("DB connection error - ", error);
        throw new Error("Cannot connect to MongoDB");
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log("DB disconnection error - ", error);
        throw new Error("Cannot disconnect from MongoDB");
    }
}

export {connectToDatabase, disconnectFromDatabase};