
import { NextFunction, Request, Response } from "express";
import { getPhoneService, postPhoneService } from "../services/phone-service";

export async function postPhoneController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { numero, cpf_usuario } = req.body;

    try {
        if (!Number(numero)) throw { type: "validation", message: "NÚMERO deve ter 10 OU 11 NÚMEROS" };
        if (!Number(cpf_usuario)) throw { type: "validation", message: "CPF deve ter 11 NÚMEROS" };

        const result = await postPhoneService(req.body);

        res.status(201).send(result)
    } catch (err) {
        console.log(err)
        next(err); 
    }
}


export async function getPhoneController(req:Request, res:Response, next:NextFunction): Promise<void> {
    const {document} = req.params;

    const cpf = document
 

    try{
        if (!Number(document)) throw { type: "validation", message: "CPF deve ter 11 NÚMEROS" };
       const result = await getPhoneService(cpf)
       res.status(200).send(result)
    }catch(err){
        console.log(err)
        next(err)
    }
      
}
