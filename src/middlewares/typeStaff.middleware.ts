import { NextFunction, Request, Response } from "express";
import { typesIdCard } from "../resources/types";
import { ResponseServer } from "../class/Response";

export const typeIdCardValidator = (req:Request, res:Response, next:NextFunction) => {

    const { type_id_card } = req.body;

    if(!typesIdCard.includes(type_id_card)){
        return res.status(400).json( new ResponseServer(`El tipo de documento debe ser (${typesIdCard})`, false, null));
    }

    next();
}