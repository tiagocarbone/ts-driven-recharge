import { Router } from "express";
import phonesRoutes from "./phones-routes"

const router = Router();
router.use(phonesRoutes)

export default router;