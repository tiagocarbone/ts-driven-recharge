import express, { json } from "express";
import dotenv from "dotenv";
import router from "./routes/index";

dotenv.config();
const app = express();
app.use(json());
app.use(router);

app.listen(process.env.PORT || 5500, () => {
    console.log("server up")
})