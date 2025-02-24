import { Router } from "express";
import phonesRoutes from "./phones-routes"
import rechargeRouter from "./recharge-routes";

const router = Router();
router.use(phonesRoutes)
router.use(rechargeRouter)

export default router;