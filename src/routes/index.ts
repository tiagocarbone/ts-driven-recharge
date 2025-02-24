import { Router } from "express";
import phonesRoutes from "./phones-routes"
import rechargeRouter from "./recharge-routes";
import summaryRouter from "./summary-routes";

const router = Router();
router.use(phonesRoutes)
router.use(rechargeRouter)
router.use(summaryRouter)

export default router;