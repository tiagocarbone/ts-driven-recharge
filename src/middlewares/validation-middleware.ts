/*

import phoneSchema from "../schemas/schemas"
import { Request, Response, NextFunction } from "express";
*/
/*
export function phonePostValidation() {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = phoneSchema.validate(req.body)
        
        if(validation.error){
            return res.status(400).send( validation.error.details.map(detail => detail.message) );
        }

        next();
    }
}
    */



import { Request, Response, NextFunction } from "express";
import { cpfSchema, phoneSchema, valorSchema } from "../schemas/schemas"; // Importe o schema correto


export function phonePostValidation(req: Request, res: Response, next: NextFunction) {
    
    const validation = phoneSchema.validate(req.body)

    if (validation.error) {
        //return res.status(400).send( validation.error.details.map(detail => detail.message) );
        if (validation.error) {
            throw { type: "joi-validation", message: validation.error.details.map(detail => detail.message) };
        }
    }
    next();
}

export function validateCpf(req:Request, res: Response, next:NextFunction){
    //const validation = cpfSchema.validate(req.p)
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


