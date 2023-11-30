import {Request, Response } from "express";
import { ResponseServer } from "../class/Response";
import { globalConfig } from "../config/config";

export const uploadFile = async ( req:Request, res:Response) => {
    try {
        const { file } = req;
        const url_document = `${globalConfig.APP_URL}:${globalConfig.PORT}/www/uploads/${file?.filename}`
        const data = {...file, url_document }
        return res.status(200).json( new ResponseServer('Archivo subido correctamente', true, data))
    } catch (e) {
        console.error(e);
        return res.status(500).json( new ResponseServer('Ocurrio un error al subir archivo', false))
    }
}