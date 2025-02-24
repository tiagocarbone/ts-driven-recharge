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

