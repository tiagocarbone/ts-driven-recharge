import { NextFunction, Request, Response } from "express";
import { postRechargeService, getRechargeService } from "../services/recharge-service";


export async function getRechargeController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { number } = req.params
        if (!Number(number)) throw { type: "validation", message: "parametro deve ser NÚMERO!" }

        const result = await getRechargeService(number)
        res.status(200).send(result)

    } catch (err) {
        next(err)
    }
}


export async function postRechargeController(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const { idPhone } = req.params;
        const id = req.params.idPhone
        const valorRecarga = req.body.valor_recarga

        if (!Number(idPhone)) throw { type: "validation", message: "parametro deve ser NÚMERO!" }
        
        const result = await postRechargeService(id, valorRecarga);
        res.status(201).send(result)

    } catch (err) {
        next(err)
    }

}

