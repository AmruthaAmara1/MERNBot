import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

//Connections and Listener
const port = process.env.PORT || 8000;
connectToDatabase().then(() => {
    app.listen(port, () => console.log("Server open & connected to DB 👌"));
}).catch((error) => console.log("Listener error - ", error));
