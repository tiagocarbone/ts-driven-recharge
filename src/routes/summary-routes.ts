
import { Router } from "express";
import {  validateCpf } from "../middlewares/validation-middleware";
import {  getSummaryController} from "../controller/summary-controller";


const summaryRouter = Router();

summaryRouter.get("/summary/:document", validateCpf, getSummaryController)




export default summaryRouter;