import { NextFunction, Request, Response } 
from "express";
import { getSummaryService } from "../services/summary-service";


export async function getSummaryController(req:Request, res:Response, next:NextFunction): Promise<void> {

    try{
    const {document} = req.params;

    if (!Number(document)) throw { type: "validation", message: "parametro deve ser NÚMERO!" }

    const result = await getSummaryService(document);
    res.status(200).send(result)

    }catch(err){
        next(err)
    }
    
}