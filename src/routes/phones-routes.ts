
import { getPhoneController, postPhoneController } from "../controller/phones-controller";

import { Router } from "express";
import { phonePostValidation, validateCpf, validateValorRecarga } from "../middlewares/validation-middleware";
import { postRechargeController } from "../controller/recharges-controller";


const phoneRouter = Router();


phoneRouter.post("/phones", phonePostValidation, postPhoneController )
phoneRouter.post("/recharges/:id", validateValorRecarga, postRechargeController)
phoneRouter.get("/:document", validateCpf, getPhoneController )


export default phoneRouter;