import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import conndectDb from "./config/db.js";
import router from "./routes/userRoutes.js"
import morgan from "morgan"
dotenv.config()

const app = express();
app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
//user routes
app.use(router)
const PORT = process.env.PORT || 8082;
conndectDb().then(() => {
    app.listen(PORT, function () {
        console.log("server listening on port " + PORT);
    })
}
)
