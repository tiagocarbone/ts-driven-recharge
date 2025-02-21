import { healthFunction } from "controller/phonesController";
import { Router } from "express";


const phoneRouter = Router();

phoneRouter.get("/health", healthFunction)
phoneRouter.post("phones", // verifico com joi )


export default phoneRouter;