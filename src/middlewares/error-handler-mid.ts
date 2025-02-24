
/*
import { Request, Response, Errback, NextFunction } from "express";

export default function errorHandler(error ,  req: Request, res:Response, next:NextFunction):  {
    if (error.type == "validation") return res.status(400).send(error.message);
    if (error.type == "conflict") return res.status(409).send(error.message);
    if (error.type == "bad request") return res.status(400).send(error.message);
    if(error.type == "not found") return res.status(404).send(error.message);
    if(error.type == "unprocessable entity") return res.status(422).send(error.message)
 }
    
*/

    
import { Request, Response, NextFunction } from "express";
import { ErrorType } from "protocols";


export default function errorHandler(error: ErrorType, req: Request, res: Response, next: NextFunction):Response | undefined   {
  if (error.type === "validation") return res.status(400).send(error.message);
  if (error.type === "conflict") return res.status(409).send(error.message);
  if (error.type === "bad request") return res.status(400).send(error.message);
  if (error.type === "not found") return res.status(404).send(error.message);
  if (error.type === "unprocessable entity") return res.status(422).send(error.message);

  if(error.type === "joi-validation") return res.status(400).send(error)

  next();

  
}



/*
import { Request, Response, NextFunction } from "express";
import { ErrorType } from "protocols";

export function errorHandler(error: ErrorType, req: Request, res: Response, next: NextFunction) {
  if (error.type === "validation") return res.status(400).send(error.message);
  if (error.type === "conflict") return res.status(409).send(error.message);
  // ... outros tipos de erro

  // Resposta padrão para qualquer erro não tratado:
  console.error("Erro não tratado:", error); 
  return res.status(500).send("Erro interno do servidor"); // Note o return aqui!
}

*/