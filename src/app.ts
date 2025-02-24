import express, { json } from "express";
import dotenv from "dotenv";
import router from "./routes/index";
import errorHandler from "./middlewares/error-handler-mid";
import { ErrorType } from "protocols";
import { Request, Response, NextFunction } from "express";


dotenv.config();
const app = express();
app.use(json());
app.use(router);



app.use((error: ErrorType, req: Request, res:Response, next: NextFunction) => { 
    errorHandler(error, req, res, next);
  });


/*
app.use(errorHandler )

*/
app.listen(process.env.PORT || 5500, () => {
    console.log("server up")
})