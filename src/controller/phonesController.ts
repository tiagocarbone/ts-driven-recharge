import{ Request, Response} from "express";

export async function healthFunction(req:Request, res: Response): Promise<void> {
    res.sendStatus(200);

}