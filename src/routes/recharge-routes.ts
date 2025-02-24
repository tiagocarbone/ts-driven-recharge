import { getPhoneController, postPhoneController } from "../controller/phones-controller";
import { Router } from "express";
import { phonePostValidation, validateCpf, validateValorRecarga } from "../middlewares/validation-middleware";
import { postRechargeController, getRechargeController } from "../controller/recharges-controller";


const rechargeRouter = Router();

//phoneRouter.get("/phones/health", healthFunctionController)
rechargeRouter.get("/recharges/:number", getRechargeController)
rechargeRouter.post("/recharges/:id", validateValorRecarga, postRechargeController)



export default rechargeRouter;