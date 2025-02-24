import { Router } from "express";
import {  validateValorRecarga } from "../middlewares/validation-middleware";
import { postRechargeController, getRechargeController } from "../controller/recharges-controller";


const rechargeRouter = Router();

rechargeRouter.get("/recharges/:number", getRechargeController)
rechargeRouter.post("/recharges/:id", validateValorRecarga, postRechargeController)



export default rechargeRouter;