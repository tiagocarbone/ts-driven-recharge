
import { getPhoneController, postPhoneController, postRechargeController } from "../controller/phones-controller";
import { Router } from "express";
import { phonePostValidation, validateCpf, validateValorRecarga } from "../middlewares/validation-middleware";


const phoneRouter = Router();

//phoneRouter.get("/phones/health", healthFunctionController)
phoneRouter.post("/phones", phonePostValidation, postPhoneController )
phoneRouter.post("/recharges/:id", validateValorRecarga, postRechargeController)
phoneRouter.get("/:document", validateCpf, getPhoneController )


export default phoneRouter;