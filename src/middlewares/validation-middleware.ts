import { Request, Response, NextFunction } from "express";
import { cpfSchema, phoneSchema, valorSchema } from "../schemas/schemas"; 

export function phonePostValidation(req: Request, res: Response, next: NextFunction) {
    const validation = phoneSchema.validate(req.body)

    if (validation.error) {

        if (validation.error) {
            throw { type: "joi-validation", message: validation.error.details.map(detail => detail.message) };
        }
    }
    next();
}

export function validateCpf(req:Request, res: Response, next:NextFunction){

    const {document} = req.params;
    
    const validation = cpfSchema.validate({document})
    if (validation.error) {
        throw { type: "joi-validation", message: "CPF deve ter 11 numeros!" };
    }
    next()
}



export function validateValorRecarga(req:Request, res: Response, next:NextFunction){

    const valorRecarga = req.body;

    const validation = valorSchema.validate(valorRecarga)
    if (validation.error) {
        throw { type: "joi-validation", message: "Valor deve ser NUMERO entre 10 e 1000" };
    }


    next()
    
}


